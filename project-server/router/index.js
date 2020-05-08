const Router = require("koa-router");
const api = require("./api-router");
const report = require("./report-router");
const data = require("./data-router");

const router = new Router();

console.log(api.routers);
router.use("/api", api.routes());
router.use("/report", report.routes());
router.use("/data", data.routes());

module.exports = router;
