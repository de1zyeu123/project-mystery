const { buildLifeReport, readJsonBody, sendJson } = require("./_roadmap-core");

module.exports = async (req, res) => {
  if (req.method !== "POST") return sendJson(res, { error: "method_not_allowed" }, 405);
  try {
    const payload = await readJsonBody(req);
    return sendJson(res, await buildLifeReport(payload));
  } catch (error) {
    return sendJson(res, { error: error.message || "server_error" }, 500);
  }
};
