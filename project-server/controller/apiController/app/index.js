const dao = require("./dao");

async function createApp(ctx) {
  console.log("收到消息");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  console.log("没了？？");
  const data = ctx.request.body;
  // TODO 创建并返回应用
  const { appName, appInfo } = data;
  const newApp = await dao.createApp(userName, appName, appInfo);
  const apps = await dao.findAppsByUserName(userName);
  ctx.success({ resType: 0, apps, currentApp: newApp });
}

async function getUserApps(ctx) {
  console.log("收到消息");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const apps = await dao.findAppsByUserName(userName);
  ctx.success({ resType: 0, apps });
}

async function bindUrl(ctx) {
  const userName = ctx.session.user;
  console.log("存在user", userName);
  if (!userName) {
    return;
  }

  const data = ctx.request.body;
  const { appId, bindUrl } = data;
  console.log("查看 bind", appId, bindUrl);
  const isOk = await dao.bindUrlOfApp(appId, userName, bindUrl);
  if (isOk) {
    ctx.success({ resType: 0, bindUrl });
  } else {
    ctx.success({ resType: 1, msg: "绑定失败" });
  }
}

async function delApp(ctx) {
  console.log("收到消息");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const data = ctx.request.body;
  const { appId } = data;
  const isDel = await dao.delApp(userName, appId);
  if (isDel) {
    const apps = await dao.findAppsByUserName(userName);
    ctx.success({ resType: 0, apps });
  }
}

async function getCountGroups(ctx) {
  console.log("收到消息getCountGroups");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const data = ctx.request.query;
  const { appId } = data;
  const countGroups = await dao.getCountGroups(appId);
  ctx.success({ resType: 0, countGroups });
}

async function changeCountGroups(ctx) {
  console.log("收到消息changeCountGroups");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const data = ctx.request.body;
  const { appId, changes } = data;
  const countGroups = dao.changeCountGroups(appId, JSON.parse(changes));
  if (countGroups) {
    ctx.success({ resType: 0, countGroups });
  } else {
    ctx.success({ resType: 1, msg: "分组数据更新失败" });
  }
}

module.exports = {
  getUserApps,
  bindUrl,
  createApp,
  delApp,
  getCountGroups,
  changeCountGroups,
};
