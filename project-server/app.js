const Koa = require("koa");
const static = require("koa-static");
const session = require("koa-session");
const koaBody = require("koa-body");
// const response = require('koa2-response');
const response = require("./koa-middleware/quick-respone");
const config = require("./config");
const routers = require("./router");
require("datejs");
const log4js = require("./utils/logger");

// 启动数据库链接 orm方式
require("./db/orm");
require("./db/mysql");

const log = log4js.getLogger("app.js");

const staticPath = "./public";

const app = new Koa();

app.keys = ["some secret hurr"]; //cookie签名

app.use(static(__dirname + "/" + staticPath));

app.use(session(config.sessionConfig, app));
app.use(koaBody());
app.use(response);
// 设置对应路由
app.use(routers.routes());
app.use(routers.allowedMethods());
// 开启监听端口
app.listen(8080);

log.info("开始监听8080端口");
log.info("localhost:8080/#/login");
log.info("localhost.charlesproxy.com:8080/#/login");
