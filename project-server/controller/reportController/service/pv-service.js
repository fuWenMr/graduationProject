const { sqlQuery } = require("../../../db/mysql");

async function pvService(query, request, ctx) {
  const { id: appId, page } = query;
  const { "user-agent": userAgent } = request.header;
  const ip = ctx.req.connection.remoteAddress;

  console.log(`${appId}收到了一次pv上报`);
  const params = [
    {
      ip,
      page,
      appId,
      userAgent,
      createAt: new Date().toString("yyyy-MM-dd HH:mm:ss"),
    },
    {
      ip,
      page,
      appId,
      userAgent,
      createAt: new Date()
        .addHours(-Math.floor(Math.random() * Math.floor(7)))
        .toString("yyyy-MM-dd HH:mm:ss"),
    },
  ];
  const sql = `INSERT INTO pv_report(ip, page, appId, createAt, userAgent) VALUES ${params
    .map(() => "(?,?,?,?,?)")
    .join(",")}`;
  let values = [];
  for (let obj of params) {
    values.push(obj.ip, obj.page, obj.appId, obj.createAt, obj.userAgent);
  }

  sqlQuery(sql, values);
}

module.exports = pvService;
