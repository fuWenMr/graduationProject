const getReport = require("../../service/reportPool").getReport;
const { sqlQuery } = require("../../../db/mysql");

async function countService(query, request) {
  const { id, key, count = 1 } = query;

  console.log(`${id} 收到了 count上报 ${key}:${count}`);
  if (!key) {
    return;
  }
  const now = new Date().toString("yyyy-MM-dd HH:mm:ss");
  const before = new Date()
    .addHours(Math.random() > 0.5 ? -1 : -5)
    .toString("yyyy-MM-dd HH:mm:ss");

  const reporter = getReport(id);
  // TODO 存储优化

  // sql appTd, key, count,createAt,
  const sql = `INSERT INTO count_report 
  (appId, createAt, countKey, count) 
  VALUES (?, ?, ?, ?)`;
  const values = [id, now, key, Number(count)];
  sqlQuery(sql, values);
  // sqlQuery(sql, [id, before, key, Number(count)]);
}

module.exports = countService;
