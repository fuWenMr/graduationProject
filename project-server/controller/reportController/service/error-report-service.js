const getReport = require("../../service/reportPool").getReport;
const { sqlQuery } = require("../../../db/mysql");

async function errorService(query, request, ctx) {
  console.log("收到了一次error 上报");
  const ip = ctx.req.connection.remoteAddress;
  const userAgent = ctx.req.headers["user-agent"];

  const { type, file, lineno, colno, stack, herf, page, id: appId } = query;
  const params = [
    [
      appId,
      ip,
      userAgent,
      page,
      type,
      file,
      lineno,
      colno,
      stack,
      herf,
      new Date().toString("yyyy-MM-dd HH:mm:ss"),
    ],
  ];
  const values = [];
  const sql = `INSERT INTO error_report(appId, ip, userAgent, page, type, file, lineno, colno, stack, herf, createAt) VALUES ${params
    .map(() => "(?,?,?,?,?,?,?,?,?,?,?)")
    .join(",")}`;
  params.forEach((t) => {
    values.push(...t);
  });
  sqlQuery(sql, values);
}

module.exports = errorService;
