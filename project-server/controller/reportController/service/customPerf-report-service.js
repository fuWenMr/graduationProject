const getReport = require("../../service/reportPool").getReport;
const { sqlQuery } = require("../../../db/mysql");

async function customPerfService(query, request, ctx) {
  console.log("收到一次customPerf 上报");
  const ip = ctx.req.connection.remoteAddress;
  const { id: appId, page, fmp, ready } = query;
  const params = [
    [appId, ip, page, fmp, ready, new Date().toString("yyyy-MM-dd HH:mm:ss")],
  ];
  const sql = `INSERT INTO custom_perf_report(appId, ip ,page, url, createAt) VALUES ${params
    .map(() => "(?,?,?,?,?,?)")
    .join(",")}`;
  let values = [];
  params.forEach((p) => {
    values.push(...p);
  });
  sqlQuery(sql, values);
}

module.exports = customPerfService;
