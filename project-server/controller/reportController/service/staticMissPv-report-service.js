const getReport = require("../../service/reportPool").getReport;
const { sqlQuery } = require("../../../db/mysql");

async function staticMissPvService(query, request, ctx) {
  const { id: appId, page } = query;
  console.log(`${appId}收到了一次staticMiss pv上报`);
  const ip = ctx.req.connection.remoteAddress;
  const params = [
    [appId, page, new Date().toString("yyyy-MM-dd HH:mm:ss"), ip],
  ];
  const sql = `INSERT INTO static_miss_pv_report(appId, page, createAt, ip) VALUES ${params
    .map(() => "(?,?,?,?)")
    .join(",")}`;
  let values = [];
  params.forEach((p) => {
    values.push(...p);
  });
  sqlQuery(sql, values);
}

module.exports = staticMissPvService;
