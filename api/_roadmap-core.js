const { readFile } = require("node:fs/promises");
const { join } = require("node:path");

const CITY_POOL = ["上海", "北京", "杭州", "深圳", "广州", "成都", "重庆", "武汉", "西安", "南京", "苏州", "天津", "郑州", "长沙", "厦门", "青岛", "沈阳", "哈尔滨", "昆明", "拉萨"];
const COPY_PROVIDER = (process.env.ROADMAP_COPY_PROVIDER || process.env.MODEL_PROVIDER || "dashscope").toLowerCase();
const MODEL = process.env.ROADMAP_COPY_MODEL || (COPY_PROVIDER === "openai" ? process.env.OPENAI_MODEL || "gpt-4.1-mini" : process.env.DASHSCOPE_MODEL || "qwen3.6-plus");
const COPY_TIMEOUT_MS = Number(process.env.ROADMAP_COPY_TIMEOUT_MS || process.env.DASHSCOPE_TIMEOUT_MS || 30000);
const WORDING_STANDARD_PATH = join(process.cwd(), "docs/logic/v2_llm_wording_standard.md");

let wordingStandardCache = null;

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

function buildHealth() {
  const modelConfig = getModelConfig();
  return {
    ok: true,
    app: "project-mystery",
    runtime: "vercel",
    copyProvider: modelConfig.provider,
    copyModel: modelConfig.model,
    copyBaseUrl: modelConfig.baseUrl,
    hasCopyKey: Boolean(modelConfig.apiKey),
    route: "/projectmystery/"
  };
}

async function buildRoadmapCopy(payload) {
  const modelConfig = getModelConfig();
  if (!modelConfig.apiKey) {
    return fallbackRoadmapCopy(payload, "server_fallback_no_key");
  }
  try {
    const modelCopy = await chatCompletionRoadmapCopy(payload, modelConfig);
    return sanitizeCopy({ ...modelCopy, source: `${modelConfig.provider}_chat_completions`, model: modelConfig.model });
  } catch (error) {
    console.error(`roadmap copy model failed: ${modelConfig.provider}:${modelConfig.model}:${error.message}`);
    return fallbackRoadmapCopy(payload, "server_fallback_model_error");
  }
}

async function buildLifeReport(payload) {
  const modelConfig = getModelConfig();
  if (!modelConfig.apiKey) {
    return fallbackLifeReport(payload, "server_fallback_no_key");
  }
  try {
    const report = await chatCompletionLifeReport(payload, modelConfig);
    return sanitizeLifeReport({ ...report, source: `${modelConfig.provider}_chat_completions`, model: modelConfig.model });
  } catch (error) {
    console.error(`life report model failed: ${modelConfig.provider}:${modelConfig.model}:${error.message}`);
    return fallbackLifeReport(payload, "server_fallback_model_error");
  }
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
}

function sendJson(res, data, status = 200) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "127.0.0.1";
}

function getModelConfig() {
  if (COPY_PROVIDER === "openai") {
    return {
      provider: "openai",
      apiKey: process.env.OPENAI_API_KEY || "",
      baseUrl: trimTrailingSlash(process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"),
      model: MODEL
    };
  }
  const dashscopeApiKey = process.env.DASHSCOPE_API_KEY || process.env.BAILIAN_API_KEY || "";
  return {
    provider: "dashscope",
    apiKey: dashscopeApiKey,
    baseUrl: trimTrailingSlash(process.env.DASHSCOPE_BASE_URL || getDefaultDashScopeBaseUrl(dashscopeApiKey)),
    model: MODEL
  };
}

async function chatCompletionRoadmapCopy(payload, modelConfig) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), COPY_TIMEOUT_MS);
  const response = await fetch(`${modelConfig.baseUrl}/chat/completions`, {
    method: "POST",
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${modelConfig.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: modelConfig.model,
      messages: [
        { role: "system", content: await buildSystemPrompt() },
        { role: "user", content: JSON.stringify(payload) }
      ],
      temperature: 0.45,
      response_format: { type: "json_object" }
    })
  });
  clearTimeout(timeout);
  if (!response.ok) throw new Error(`model request failed: ${response.status}`);
  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "";
  if (!text) throw new Error("model response has no message content");
  return parseJsonObject(text);
}

async function buildSystemPrompt() {
  if (!wordingStandardCache) {
    const standard = await readFile(WORDING_STANDARD_PATH, "utf8").catch(() => "");
    wordingStandardCache = [
      "你是人生路况产品的受控文案层。",
      "只根据用户基础信息和已计算路线改写短文案。",
      "不得改变路线 id，不得输出医疗、法律、投资保证、关系操控或确定性命运判断。",
      "必须返回纯 JSON，不要 Markdown，不要解释。",
      standard
    ].join("\n\n");
  }
  return wordingStandardCache;
}

async function chatCompletionLifeReport(payload, modelConfig) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), COPY_TIMEOUT_MS);
  const response = await fetch(`${modelConfig.baseUrl}/chat/completions`, {
    method: "POST",
    signal: controller.signal,
    headers: {
      Authorization: `Bearer ${modelConfig.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: modelConfig.model,
      messages: [
        {
          role: "system",
          content: [
            "你是人生路况产品的报告层。",
            "写一份 1000-2000 字中文未来 20 年报告。",
            "结构：总体判断、当前基础盘、已选择路径、未来 1-5/6-10/11-15/16-20 年分段、阶段回顾、建议。",
            "只讲趋势和选择代价，不讲绝对命运，不输出医疗、法律、投资保证。",
            "必须返回纯 JSON：{ title, report }。"
          ].join("\n")
        },
        { role: "user", content: JSON.stringify(payload) }
      ],
      temperature: 0.58,
      response_format: { type: "json_object" }
    })
  });
  clearTimeout(timeout);
  if (!response.ok) throw new Error(`model request failed: ${response.status}`);
  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "";
  if (!text) throw new Error("model response has no message content");
  return parseJsonObject(text);
}

function fallbackLifeReport(payload, source) {
  return sanitizeLifeReport({
    source,
    model: "none",
    title: "你的未来20年报告",
    report: buildFallbackLifeReportText(payload)
  });
}

function sanitizeLifeReport(report) {
  const title = String(report.title || "你的未来20年报告").replace(/\s+/g, "").slice(0, 18);
  let text = String(report.report || "").trim();
  if (text.length < 900 || text.length > 2400) text = buildFallbackLifeReportText(report.payload || {});
  return {
    source: report.source || "unknown",
    model: report.model || "unknown",
    title,
    report: text
  };
}

function buildFallbackLifeReportText(payload) {
  const journey = Array.isArray(payload?.journey) ? payload.journey : [];
  const profile = payload?.profile || {};
  const terminal = payload?.terminal || {};
  const scores = payload?.scores || {};
  const birth = payload?.birth || {};
  const today = payload?.today || {};
  const context = payload?.lifeContext || {};
  const steps = journey.filter((node) => node.id !== "START");
  const first = steps[0] || {};
  const second = steps[1] || {};
  const third = steps[2] || {};
  const final = steps[steps.length - 1] || terminal;
  const routeLine = steps.map((node) => node.title).filter(Boolean).join(" -> ") || "当前路线已收束";
  const stageLines = steps.map((node) => `- ${node.stageLabel || "未来阶段"}：${node.title || "阶段选择"}。${node.stageDetail || node.body || "这一段会继续展开新的判断。"}`).join("\n");
  return [
    "你的未来 20 年报告",
    "",
    "这份报告只判断未来 20 年，不把更远的人生一次说死。20 年后，人的资源、关系、能力结构、身体节奏和外部环境都会换一轮，那时会出现新的你，也会出现新的分岔。所以这里不是终身判词，而是一份基于当前八字信息、今日天时、人生阶段和你一路选择形成的路径回顾。",
    "",
    `你的基础盘显示，当前年龄约 ${profile.currentAge || "未知"} 岁，日柱为 ${birth.pillars?.day || "未知"}，日主为 ${birth.dayMaster || "未知"}。今天是 ${today.pillars?.day || "未知"}日，今日宜忌只用于修正行动节奏，不直接决定人生结果。你现在处在${context.lifeStage || "当前阶段"}，系统用这张拓扑图呈现未来二十年的决策树，是为了看每一步选择会带来什么可能。`,
    "",
    `你这次走出的路径是：${routeLine}。第一段，${first.stageLabel || "未来第 1-5 年"}，你进入「${first.title || "起步选择"}」。这代表未来五年的重点不是终局，而是确认哪条路值得投入。这个阶段要少做口头上的大判断，多做能拿到回音的小动作。`,
    "",
    `第二段，${second.stageLabel || "未来第 6-10 年"}，路线进入「${second.title || "承接阶段"}」。这十年附近，你会开始看到早期选择的代价和回报。如果前面走得快，这里要把机会接回规则；如果前面走得稳，这里要避免稳定变成拖延。适合把资源、合作、能力和现金流重新排一遍。`,
    "",
    `第三段，${third.stageLabel || "未来第 11-15 年"}，你会遇到「${third.title || "中段选择"}」。这是路线的承压段，也是路径质量最容易分出来的地方。行动火候${scoreToneText(scores.momentum)}，基础稳度${scoreToneText(scores.stability)}，外部助力${scoreToneText(scores.support)}，阻力信号${scoreToneText(scores.risk)}。这说明你不能只问快不快，要问这条路能不能长期承重。`,
    "",
    `最后，${final.stageLabel || "未来第 16-20 年"}，路线收束到「${final.title || terminal.title || "未来总结"}」。它不是命运终点，而是未来二十年这条走法更可能形成的生活状态。${terminal.body || final.body || "结果取决于你是否守住边界，并把前面的选择变成可持续的结构。"} 二十年以后会进入新的阶段，那时你已经不是今天的你，新的判断要重新生成。`,
    "",
    "阶段回顾：",
    stageLines,
    "",
    "给你的建议是：第一，五年内不要把试探当成定局，先让选择产生证据。第二，十年内要把机会和主线接起来，不让人生变成一堆散点。第三，十五年内要看承压能力，能不能长期走，比一时速度更重要。第四，二十年节点只做总结，不做永久结论。真正值得带走的是这条原则：选择不可回退，但每一步都可以走得更清楚。"
  ].join("\n");
}

function fallbackRoadmapCopy(payload, source) {
  const domain = payload?.intent?.domain || "general";
  const question = String(payload?.question || "");
  const copySet = getFallbackSet(domain, question);
  return sanitizeCopy({
    source,
    model: "none",
    headline: payload?.selectedRoute === "B" ? "机会初亮" : payload?.selectedRoute === "C" ? "先避阻力" : "路在成形",
    subline: copySet[payload?.selectedRoute || "A"].cardLine,
    routes: ["A", "B", "C"].map((id) => ({ id, ...copySet[id] }))
  });
}

function getFallbackSet(domain, question) {
  if (/换|变道|选择|改变|离职|转向/.test(question)) {
    return {
      A: { summary: "留在主线", cardLine: "保留现路线", action: "先保留主路线，只做小幅调整" },
      B: { summary: "小步转向", cardLine: "试一个短窗口", action: "只试一个低成本窗口" },
      C: { summary: "延后定局", cardLine: "等信号清楚", action: "等信息更完整再动" }
    };
  }
  if (domain === "wealth") {
    return {
      A: { summary: "守住边界", cardLine: "小额先验证", action: "只做小额可逆动作" },
      B: { summary: "小额试水", cardLine: "有证据再加速", action: "机会明确才加速" },
      C: { summary: "先看清楚", cardLine: "先避风险", action: "今天少做不可逆承诺" }
    };
  }
  if (domain === "relationship") {
    return {
      A: { summary: "轻声靠近", cardLine: "先释放善意", action: "轻一点联系，不逼表态" },
      B: { summary: "说清重点", cardLine: "短句留余地", action: "只说一个重点" },
      C: { summary: "先留空间", cardLine: "不催不试探", action: "稍后再沟通" }
    };
  }
  if (domain === "mood") {
    return {
      A: { summary: "回到节奏", cardLine: "完成一小事", action: "先做一件能完成的小事" },
      B: { summary: "轻推一格", cardLine: "只做短任务", action: "只做短程推进" },
      C: { summary: "回安全区", cardLine: "休整少输入", action: "减少刺激，把能量留给自己" }
    };
  }
  if (domain === "career") {
    return {
      A: { summary: "先交成果", cardLine: "先交付一段", action: "先推进确定性最高的一小步" },
      B: { summary: "试新入口", cardLine: "主动争取", action: "递出一次明确请求" },
      C: { summary: "先铺条件", cardLine: "补材料等反馈", action: "先补关键条件" }
    };
  }
  return {
    A: { summary: "稳住今天", cardLine: "先收手边事", action: "先做确定性高的事项" },
    B: { summary: "试一个窗口", cardLine: "只推一个重点", action: "只推一个最有把握的机会" },
    C: { summary: "先留余地", cardLine: "补能观察", action: "把消耗降下来" }
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

function parseJsonObject(text) {
  const cleaned = String(text || "").trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
    throw new Error("model response is not valid JSON");
  }
}

function trimTrailingSlash(value) {
  return String(value || "").replace(/\/+$/, "");
}

function getDefaultDashScopeBaseUrl(apiKey) {
  if (String(apiKey || "").startsWith("sk-sp-")) {
    return "https://dashscope-intl.aliyuncs.com/compatible-mode/v1";
  }
  return "https://dashscope.aliyuncs.com/compatible-mode/v1";
}

function stableHash(seed) {
  let hash = 0;
  for (let i = 0; i < String(seed).length; i += 1) hash = (hash * 31 + String(seed).charCodeAt(i)) >>> 0;
  return hash;
}

function scoreToneText(score) {
  if (Number(score) >= 68) return "偏亮";
  if (Number(score) >= 54) return "可用";
  return "偏弱";
}

module.exports = {
  buildContext,
  buildHealth,
  buildLifeReport,
  buildRoadmapCopy,
  readJsonBody,
  sendJson
};
