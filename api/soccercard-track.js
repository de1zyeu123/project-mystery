const { createHash } = require("node:crypto");
const { readJsonBody, sendJson } = require("./_roadmap-core");

const MAX_EVENTS = 20;
const MAX_DETAIL_BYTES = 12000;
const ALLOWED_EVENTS = new Set([
  "page_view",
  "screen_view",
  "form_start",
  "field_interaction",
  "generate_click",
  "loading_view",
  "result_view",
  "result_image_loaded",
  "result_asset_load_failed",
  "reading_expand",
  "reading_collapse",
  "share_click",
  "share_close",
  "poster_generated",
  "poster_download",
  "gallery_open",
  "gallery_page",
  "gallery_card_open",
  "library_back",
  "regen_click",
  "exit",
]);

module.exports = async (req, res) => {
  setCorsHeaders(res);
  if (req.method === "OPTIONS") return sendJson(res, { ok: true });
  if (req.method !== "POST") return sendJson(res, { error: "method_not_allowed" }, 405);

  try {
    const body = await readJsonBody(req);
    const rawEvents = Array.isArray(body?.events) ? body.events : [body];
    const events = rawEvents.slice(0, MAX_EVENTS)
      .map((event) => normalizeEvent(req, event))
      .filter(Boolean);

    if (!events.length) return sendJson(res, { error: "invalid_event" }, 400);

    console.log(JSON.stringify({
      type: "soccercard_analytics",
      accepted: events.length,
      events,
    }));

    await forwardEvents(events);
    return sendJson(res, { ok: true, accepted: events.length });
  } catch (error) {
    console.error(JSON.stringify({
      type: "soccercard_analytics_error",
      message: error?.message || "server_error",
    }));
    return sendJson(res, { error: "server_error" }, 500);
  }
};

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
}

function normalizeEvent(req, event) {
  if (!event || typeof event !== "object") return null;
  const name = clampString(event.event, 64);
  if (!ALLOWED_EVENTS.has(name)) return null;
  const server = getServerContext(req);
  return {
    event: name,
    version: clampString(event.version, 64),
    visitorId: clampString(event.visitorId, 96),
    sessionId: clampString(event.sessionId, 96),
    screen: clampString(event.screen, 64),
    page: sanitizeObject(stripSensitiveKeys(event.page), 1200),
    source: sanitizeObject(stripSensitiveKeys(event.source), 1800),
    details: sanitizeObject(stripSensitiveKeys(event.details), MAX_DETAIL_BYTES),
    clientTs: clampString(event.clientTs, 40),
    serverTs: new Date().toISOString(),
    server,
  };
}

function getServerContext(req) {
  const ip = getClientIp(req);
  return {
    ipHash: hashValue(`${process.env.SOCCERCARD_TRACK_SALT || "soccercard-track-v1"}:${ip}`),
    country: clampString(req.headers["x-vercel-ip-country"], 16),
    region: clampString(req.headers["x-vercel-ip-country-region"], 64),
    city: clampString(req.headers["x-vercel-ip-city"], 128),
    userAgent: clampString(req.headers["user-agent"], 300),
    referer: clampString(req.headers.referer || req.headers.referrer, 600),
  };
}

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

function hashValue(value) {
  return createHash("sha256").update(String(value || "")).digest("hex").slice(0, 32);
}

function stripSensitiveKeys(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const blocked = new Set([
    "nickname",
    "birthdate",
    "birthtime",
    "birthplace",
    "gender",
    "input",
    "query",
    "landingQuery",
    "email",
    "phone",
  ]);
  return Object.fromEntries(
    Object.entries(value).filter(([key]) => !blocked.has(key)),
  );
}

function sanitizeObject(value, maxBytes) {
  if (!value || typeof value !== "object") return {};
  const parsed = JSON.parse(JSON.stringify(value));
  const text = JSON.stringify(parsed);
  if (Buffer.byteLength(text, "utf8") <= maxBytes) return parsed;
  return { truncated: true };
}

function clampString(value, max) {
  if (typeof value !== "string") return "";
  return value.slice(0, max);
}

async function forwardEvents(events) {
  const url = process.env.SOCCERCARD_TRACK_WEBHOOK_URL;
  if (!url) return;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type: "soccercard_analytics", events }),
  });
  if (!response.ok) throw new Error(`tracking_webhook_failed:${response.status}`);
}
