const Router = require("koa-router");
const reportController = require("../controller/reportController");

let routers = new Router();

console.log("++++", JSON.stringify(reportController));

// routers about user
routers = routers.get("/w_png", reportController.report);

module.exports = routers;
