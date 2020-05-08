const Router = require("koa-router");
const dataController = require("../controller/dataController");

let routers = new Router();

console.log("++++", JSON.stringify(dataController));

// routers about user
routers = routers
  .get("/getSpeedAvg", dataController.getSpeedAvg)
  .get("/getSpeedPrice", dataController.getSpeedPrice)
  .get("/getCustomKeys", dataController.getCustomKeys)
  .get("/getCountData", dataController.getCountData);

module.exports = routers;
