const dao = require("./dao");
const appDao = require("../app/dao");
const { appConfig } = require("../../../config");
const { sendEmail } = require("../../../utils/email");

async function doLogin(ctx) {
  const data = ctx.request.body;
  const { userName, password } = data;

  const user = await dao.findUserByAccount(userName, password);
  if (!user) {
    ctx.success({ resType: 1, msg: "邮箱或密码不正确" });
  } else if (user.activeKey !== "0") {
    console.log("让我看看", user.activeKey);
    ctx.success({ resType: 1, msg: "该账号还未激活" });
  } else {
    ctx.session.user = userName;
    ctx.success({ resType: 0, userName });
  }
}

async function doLogout(ctx) {
  ctx.session.user = undefined;
  ctx.success({ resType: 0 });
}

async function doRegister(ctx) {
  const data = ctx.request.body;
  const { userName, password } = data;

  // 先验证是否注册
  const user = await dao.hasUserRegisted(userName, password);

  if (user) {
    ctx.success({ type: 1, msg: "该邮箱已被注册" });
    return;
  }

  // 未注册的话去发送邮件
  const { activeKey } = await dao.registerNewUser(userName, password);
  await sendEmail(userName, {
    subject: `${appConfig.name}账号激活`,
    html: `<html><body>
        <h2>感谢选择${appConfig.name}的服务</h2>
        <div>点击下面的链接激活你的账户, 让${appConfig.name}协助你打造高质量的应用</div>
        <br>
        <a href="${appConfig.url}/api/doActiveUser?key=${activeKey}">
          ${appConfig.url}/api/doActiveUser?key=${activeKey}
        </a>
        <p>这是一条自动发送的邮件,请勿回复</p>
      <body></html>`,
  });

  // 创建个默认服务器
  await appDao.createApp(userName);

  ctx.success({ resType: 0, activeKey });
}

async function doActiveUser(ctx) {
  const { key = " " } = ctx.request.query;
  const isActive = await dao.activeUser(key);
  ctx.body = `<html>${isActive ? "激活成功" : "无效/已失效的链接"}</html>`;
}

async function getResetCaptcha(ctx) {
  const data = ctx.request.body;
  const { userName } = data;
  const user = await dao.hasUserRegisted(userName);

  if (!user) {
    console.log("验证的邮箱还未注册");
    ctx.success({ resType: 1, errMsg: "该邮箱还未注册" });
  } else {
    // 发送验证码并存到session中
    const resetCaptcha = parseInt((Math.random() + 1) * Math.pow(10, 7));
    console.log("---------产生了验证码", resetCaptcha);
    await sendEmail(userName, {
      subject: `${appConfig.name}密码重置`,
      text: `你的重置验证码为${resetCaptcha}/n 请尽快修改密码防止验证码失效`,
    });
    ctx.session.resetCaptcha = resetCaptcha;
    console.log("能看到验证码吗", ctx.session.resetCaptcha);
    ctx.success({ resType: 0 });
  }
}

async function doReset(ctx) {
  const data = ctx.request.body;
  const { userName, password, captcha } = data;
  if (ctx.session.resetCaptcha !== captcha) {
    ctx.success({ resType: 1, errMsg: "验证码错误" });
  }

  const isReset = await dao.resetUser(userName, password);
  if (isReset) {
    ctx.success({ resType: 0, errMsg: "验证码错误" });
  } else {
    ctx.success({ resType: 1, errMsg: "该邮箱还未注册" });
  }
}

module.exports = {
  doLogin,
  doLogout,
  doRegister,
  doActiveUser,
  doReset,
  getResetCaptcha,
};
