const getReport = require("../../service/reportPool").getReport;
const { sqlQuery } = require("../../../db/mysql");

async function staticMissService(query, request, ctx) {
  console.log("收到一次staticMiss 上报");
  const ip = ctx.req.connection.remoteAddress;
  const { id: appId, page, url } = query;
  const params = [
    [appId, ip, page, url, new Date().toString("yyyy-MM-dd HH:mm:ss")],
  ];
  const sql = `INSERT INTO static_miss_report(appId, ip ,page, url, createAt) VALUES ${params
    .map(() => "(?,?,?,?,?)")
    .join(",")}`;
  let values = [];
  params.forEach((p) => {
    values.push(...p);
  });
  sqlQuery(sql, values);
}

module.exports = staticMissService;
