// http://localhost.charlesproxy.com:8080/report/w_png
const queryRouter = require("./query-router");

async function report(ctx) {
  // console.log('我只想说我收到了一次报告')
  ctx.type = "image/png";
  ctx.body = "";

  const request = ctx.request;
  queryRouter(request, ctx);
}

module.exports = {
  report,
};
