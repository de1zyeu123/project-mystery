import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = normalize(join(fileURLToPath(import.meta.url), "..", ".."));
const PORT = Number(process.env.PORT || 4173);
const CITY_POOL = ["上海", "北京", "杭州", "深圳", "广州", "成都", "重庆", "武汉", "西安", "南京", "苏州", "天津", "郑州", "长沙", "厦门", "青岛", "沈阳", "哈尔滨", "昆明", "拉萨"];
const MODEL = process.env.OPENAI_MODEL || "gpt-4.1-mini";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname === "/api/context" && req.method === "GET") {
      return sendJson(res, buildContext(req));
    }
    if (url.pathname === "/api/roadmap-copy" && req.method === "POST") {
      const body = await readJson(req);
      const copy = await buildRoadmapCopy(body);
      return sendJson(res, copy);
    }
    return serveStatic(url.pathname, res);
  } catch (error) {
    return sendJson(res, { error: error.message || "server_error" }, 500);
  }
});

server.listen(PORT, () => {
  console.log(`life-roadmap server listening on http://127.0.0.1:${PORT}/preview/life-roadmap-mvp/`);
});

function buildContext(req) {
  const rawIp = getClientIp(req);
  const ipHash = stableHash(rawIp);
  const isLocal = /^(::1|127\.0\.0\.1|::ffff:127\.0\.0\.1)$/.test(rawIp);
  return {
    source: isLocal ? "loopback_ip" : "server_ip",
    city: CITY_POOL[ipHash % CITY_POOL.length],
    ipHash,
    country: "unknown"
  };
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return req.socket.remoteAddress || "127.0.0.1";
}

async function buildRoadmapCopy(payload) {
  if (!process.env.OPENAI_API_KEY) {
    return fallbackRoadmapCopy(payload, "server_fallback_no_key");
  }
  const modelCopy = await openaiRoadmapCopy(payload);
  return sanitizeCopy({ ...modelCopy, source: "openai_responses", model: MODEL });
}

async function openaiRoadmapCopy(payload) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      instructions: [
        "你是人生路况产品的受控文案层。",
        "只根据用户问题和已计算路线，改写短文案。",
        "不得改变路线 id，不得输出医疗、法律、投资保证、关系操控或确定性命运判断。",
        "语言要像 C 端游戏任务提示：短、明确、有行动感。",
        "风格可以轻俏，但必须克制；可说火候、顺势、缓冲，不说绝对吉凶。"
      ].join("\n"),
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: JSON.stringify(payload) }]
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "life_roadmap_copy",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["headline", "subline", "routes"],
            properties: {
              headline: { type: "string" },
              subline: { type: "string" },
              routes: {
                type: "array",
                minItems: 3,
                maxItems: 3,
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["id", "summary", "cardLine", "action"],
                  properties: {
                    id: { type: "string", enum: ["A", "B", "C"] },
                    summary: { type: "string" },
                    cardLine: { type: "string" },
                    action: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    })
  });
  if (!response.ok) throw new Error(`OpenAI request failed: ${response.status}`);
  const data = await response.json();
  const text = data.output_text || data.output?.flatMap((item) => item.content || []).map((item) => item.text || "").join("");
  if (!text) throw new Error("OpenAI response has no output_text");
  return JSON.parse(text);
}

function fallbackRoadmapCopy(payload, source) {
  const domain = payload?.intent?.domain || "general";
  const question = String(payload?.question || "");
  const copySet = getFallbackSet(domain, question);
  return sanitizeCopy({
    source,
    model: "none",
    headline: payload?.selectedRoute === "B" ? "抓短窗口" : payload?.selectedRoute === "C" ? "先降噪音" : "稳步推进",
    subline: copySet[payload?.selectedRoute || "A"].cardLine,
    routes: ["A", "B", "C"].map((id) => ({ id, ...copySet[id] }))
  });
}

function getFallbackSet(domain, question) {
  if (/换|变道|选择|改变|离职|转向/.test(question)) {
    return {
      A: { summary: "先不大改", cardLine: "保留主路线", action: "先保留主路线，只做小幅调整" },
      B: { summary: "试探变道", cardLine: "追一个短窗口", action: "只试一个低成本窗口" },
      C: { summary: "绕行观察", cardLine: "等信号清楚", action: "等信息更完整再动" }
    };
  }
  if (domain === "wealth") {
    return {
      A: { summary: "稳投路", cardLine: "小额先验证", action: "只做小额可逆动作" },
      B: { summary: "追击路", cardLine: "有证据再追", action: "机会明确才追击" },
      C: { summary: "观望路", cardLine: "先避坑", action: "今天少做不可逆承诺" }
    };
  }
  if (domain === "relationship") {
    return {
      A: { summary: "轻沟通", cardLine: "先释放善意", action: "轻一点联系，不逼表态" },
      B: { summary: "说重点", cardLine: "短句明确", action: "只说一个重点" },
      C: { summary: "留空间", cardLine: "不催不试探", action: "晚一点再沟通" }
    };
  }
  if (domain === "mood") {
    return {
      A: { summary: "慢节奏", cardLine: "完成一小事", action: "先做一件能完成的小事" },
      B: { summary: "短冲刺", cardLine: "只冲25分钟", action: "只做短冲刺" },
      C: { summary: "绕开噪音", cardLine: "休整少输入", action: "减少刺激，把能量留给自己" }
    };
  }
  if (domain === "career") {
    return {
      A: { summary: "小步推进", cardLine: "先交付一段", action: "先推进确定性最高的一小步" },
      B: { summary: "追击窗口", cardLine: "主动争取", action: "抓短窗口主动出手" },
      C: { summary: "先铺条件", cardLine: "补材料等反馈", action: "先补关键条件" }
    };
  }
  return {
    A: { summary: "慢节奏", cardLine: "整理收尾复盘", action: "先做低风险事项" },
    B: { summary: "追击窗口", cardLine: "只冲一个重点", action: "只追一个最有把握的机会" },
    C: { summary: "低压安排", cardLine: "补能观察", action: "把压力降下来" }
  };
}

function sanitizeCopy(copy) {
  const routeMap = new Map((copy.routes || []).map((route) => [route.id, route]));
  return {
    source: copy.source || "unknown",
    model: copy.model || "unknown",
    headline: clampText(copy.headline, 8),
    subline: clampText(copy.subline, 12),
    routes: ["A", "B", "C"].map((id) => {
      const route = routeMap.get(id) || {};
      return {
        id,
        summary: clampText(route.summary, 7),
        cardLine: clampText(route.cardLine, 10),
        action: clampText(route.action, 18)
      };
    })
  };
}

function clampText(value, max) {
  return String(value || "").replace(/\s+/g, "").slice(0, max);
}

function stableHash(seed) {
  let hash = 0;
  for (let i = 0; i < String(seed).length; i += 1) hash = (hash * 31 + String(seed).charCodeAt(i)) >>> 0;
  return hash;
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function sendJson(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

function serveStatic(pathname, res) {
  let cleanPath = pathname === "/"
    ? "/preview/life-roadmap-mvp/index.html"
    : decodeURIComponent(pathname.endsWith("/") ? `${pathname}index.html` : pathname);
  let filePath = normalize(join(ROOT, cleanPath));
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    cleanPath = `${cleanPath}/index.html`;
    filePath = normalize(join(ROOT, cleanPath));
  }
  if (!filePath.startsWith(ROOT) || !existsSync(filePath)) {
    sendJson(res, { error: "not_found" }, 404);
    return;
  }
  res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
  createReadStream(filePath)
    .on("error", () => sendJson(res, { error: "read_failed" }, 500))
    .pipe(res);
}
