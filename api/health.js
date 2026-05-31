const { buildHealth, sendJson } = require("./_roadmap-core");

module.exports = (req, res) => {
  if (req.method !== "GET") return sendJson(res, { error: "method_not_allowed" }, 405);
  return sendJson(res, buildHealth());
};
