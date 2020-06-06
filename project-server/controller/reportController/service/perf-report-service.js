const getReport = require("../../service/reportPool").getReport;
const { sqlQuery } = require("../../../db/mysql");

async function perfService(query, request, ctx) {
  console.log("收到一次perf 上报");
  const ip = ctx.req.connection.remoteAddress;
  const {
    id: appId,
    page,
    dns,
    ttfb,
    trans,
    dom,
    res,
    t_fpt,
    t_tti,
    t_ready,
  } = query;
  const params = [
    [
      appId,
      ip,
      page,
      dns,
      ttfb,
      trans,
      dom,
      res,
      t_fpt,
      t_tti,
      t_ready,
      new Date().toString("yyyy-MM-dd HH:mm:ss"),
    ],
  ];
  const sql = `INSERT INTO perf_report(appId, ip ,page, dns, ttfb, trans, dom, res, t_fpt, t_tti, t_ready, createAt) VALUES ${params
    .map(() => "(?,?,?,?,?,?,?,?,?,?,?,?)")
    .join(",")}`;
  let values = [];
  params.forEach((p) => {
    values.push(...p);
  });
  sqlQuery(sql, values);
}

module.exports = perfService;
