const getReport = require("../../service/reportPool").getReport;
const { sqlQuery } = require("../../../db/mysql");

async function errorPvService(query, request, ctx) {
  const { id: appId, page } = query;
  console.log(`${appId}收到了一次erroPpv上报`);
  const ip = ctx.req.connection.remoteAddress;
  const params = [
    [appId, page, new Date().toString("yyyy-MM-dd HH:mm:ss"), ip],
  ];
  const sql = `INSERT INTO error_pv_report(appId, page, createAt, ip) VALUES ${params
    .map(() => "(?,?,?,?)")
    .join(",")}`;
  let values = [];
  params.forEach((p) => {
    values.push(...p);
  });
  sqlQuery(sql, values);
}

module.exports = errorPvService;
