const Router = require('koa-router');
const apiController = require('../controller/apiController');
const { appController } = apiController;

let routers = new Router();

console.log('++++', JSON.stringify(apiController));

// routers about user
routers = routers
  .post('/doLogout', apiController.doLogout)
  .post('/doLogin', apiController.doLogin)
  .post('/doRegister', apiController.doRegister)
  .post('/doReset', apiController.doReset)
  .post('/getResetCaptcha', apiController.getResetCaptcha)
  .get('/doActiveUser', apiController.doActiveUser);

// routers about app
routers = routers
  .post('/createApp', appController.createApp)
  .post('/getUserApps', appController.getUserApps)
  .post('/bindUrl', appController.bindUrl)
  .post('/delApp', appController.delApp)
  .get('/getCountGroups', appController.getCountGroups)
  .post('/changeCountGroups', appController.changeCountGroups)
  .post('/editApp', appController.editApp)
  .post('/getAppById', appController.getAppById)
  .post('/joinApp', appController.joinApp)
  .post('/getAppUsers', appController.getAppUsers)
  .post('/deleteAppUsers', appController.deleteAppUsers)
  .post('/newBoss', appController.newBoss)
  .post('/outApp', appController.outApp)
  .post('/allowJoin', appController.allowJoin)
  .post('/getMessage', appController.getMessage);

module.exports = routers;
