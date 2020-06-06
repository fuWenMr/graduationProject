const Router = require('koa-router');
const dataController = require('../controller/dataController');

let routers = new Router();

console.log('++++', JSON.stringify(dataController));

// routers about user
routers = routers
  .get('/getSpeedAvg', dataController.getSpeedAvg)
  .get('/getSpeedPrice', dataController.getSpeedPrice)
  .get('/getCustomKeys', dataController.getCustomKeys)
  .get('/getCountData', dataController.getCountData)
  .get('/getPvCount', dataController.getPvCount)
  .get('/getErrorData', dataController.getErrorData)
  .get('/getErrorList', dataController.getErrorList)
  .get('/getStaticMissList', dataController.getStaticMissList)
  .get('/getErrorDetail', dataController.getErrorDetail)
  .get('/getApiList',dataController.getApiList)
  .get('/getApiErrorLog', dataController.getApiErrorLog)
  .get('/getApiData', dataController.getApiData)
  .get('/getApiSpeedPrice', dataController.getApiSpeedPrice)
;

module.exports = routers;
