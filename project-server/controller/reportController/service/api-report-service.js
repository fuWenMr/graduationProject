const getReport = require("../../service/reportPool").getReport;
const { sqlQuery } = require("../../../db/mysql");

async function apifService(query, request, ctx) {
  console.log("收到一次api 上报");
  const ip = ctx.req.connection.remoteAddress;
  const { id: appId, page, ok, url, status, response = "", time } = query;
  const params = [
    [
      appId,
      ip,
      page,
      ok,
      url,
      status,
      response,
      time,
      new Date().toString("yyyy-MM-dd HH:mm:ss"),
    ],
  ];
  const sql = `INSERT INTO api_report(appId, ip ,page, ok, url, status, response, time, createAt) VALUES ${params
    .map(() => "(?,?,?,?,?,?,?,?,?)")
    .join(",")}`;
  let values = [];
  params.forEach((p) => {
    values.push(...p);
  });
  sqlQuery(sql, values);
}

module.exports = apifService;
