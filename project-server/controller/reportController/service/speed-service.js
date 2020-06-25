const { sqlQuery } = require("../../../db/mysql");

const keysPool = [
  "t0",
  "t1",
  "t2",
  "t3",
  "t4",
  "t5",
  "t6",
  "t7",
  "t8",
  "t9",
  "t10",
  "t11",
];

async function speedService(query, request) {
  const { id, t, ...other } = query;

  for (let key of Object.keys(other)) {
    if (keysPool.find((a) => key === a) && Number(query[key]) > 0) {
      // TODO 存储过程优化
      const now = new Date().toString("yyyy-MM-dd HH:mm:ss");
      const before = new Date()
        .addHours(Math.random() > 0.5 ? -1 : -5)
        .toString("yyyy-MM-dd HH:mm:ss");
      const sql = `INSERT INTO speed_report 
        (appId, createAt, speedKey, speed) 
        VALUES (?, ?, ?, ?)`;
      const values = [id, now, key, Number(query[key])];
      sqlQuery(sql, values);
      // sqlQuery(sql, [id, before, key, Number(query[key])]);
    }
  }
  console.log(`${id}收到了一次speed上报`);
}

module.exports = speedService;
