const Koa = require("koa");
const static = require("koa-static");

console.log('启动中');
const staticPath = "./static";
const app = new Koa();
app.use(static(__dirname + "/" + staticPath));

app.listen(8081);

console.log('测试服务器开始监听8081端口');
