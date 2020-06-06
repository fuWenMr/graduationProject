const dao = require("./dao");

async function createApp(ctx) {
  console.log("收到消息");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const data = ctx.request.body;
  // TODO 创建并返回应用
  const { appName, appInfo } = data;
  const newApp = await dao.createApp(userName, appName, appInfo);
  const apps = await dao.findAppsByUserName(userName);
  ctx.success({ resType: 0, apps, currentApp: newApp });
}

async function getUserApps(ctx) {
  console.log("收到消息 getUserApps");
  const userName = ctx.session.user;
  console.log(userName);
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

async function editApp(ctx) {
  console.log("收到消息editApp");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const { appId, appInfo } = ctx.request.body;
  // const app = await dao.findAppById(appId);
  // if (!app || app.owner !== userName) {
  //   ctx.success({ resType: 1104, msg: '无权限修改' });
  //   return ;
  // }
  // app.appInfo = appInfo,
  // await app.save();
  ctx.success({ resType: 0 });
}

async function getAppById(ctx) {
  console.log("收到消息getAppById");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const { appId } = ctx.request.body;
  const app = await dao.findAppById(appId);
  ctx.success({ resType: 0, app });
}

async function joinApp(ctx) {
  console.log("收到消息joinApp");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const { appId } = ctx.request.body;
  const app = await dao.findUser_app(userName, appId);
  if (app && app.active !== 4) {
    ctx.success({ resType: 1, msg: "你的申请正在等待审批" });
    return;
  }
  await dao.joinApp(userName, appId);
  ctx.success({ resType: 0 });
}

async function getMessage(ctx) {
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const messages = await dao.findMessage(userName);
  ctx.success({ resType: 0, messages });
}

async function allowJoin(ctx) {
  const userNameOwner = ctx.session.user;
  if (!userNameOwner) {
    return;
  }
  const { appId, userName } = ctx.request.body;
  await dao.allowUserJoinApp(appId, userName);
  ctx.success({ resType: 0 });
}

async function getAppUsers(ctx) {
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const { appId } = ctx.request.body;
  const res = await dao.findUsersOfApp(appId);
  ctx.success({ resType: 0, res });
}

async function deleteAppUsers(ctx) {
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const { appId, users } = ctx.request.body;
  await dao.deleteAppUsers(appId, users);
  ctx.success({ resType: 0 });
}

async function newBoss(ctx) {
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const { appId, user } = ctx.request.body;
  await dao.changeBoss(appId, userName, user);
  ctx.success({ resType: 0 });
}

async function outApp(ctx) {
  console.log("收到一次api请求--");
  const userName = ctx.session.user;
  if (!userName) {
    return;
  }
  const { appId } = ctx.request.body;
  await dao.deleteAppUsers(appId, userName);
  ctx.success({ resType: 0 });
}

module.exports = {
  getUserApps,
  bindUrl,
  createApp,
  delApp,
  joinApp,
  editApp,
  getMessage,
  allowJoin,
  getAppById,
  getCountGroups,
  changeCountGroups,
  getAppUsers,
  deleteAppUsers,
  newBoss,
  outApp,
};
