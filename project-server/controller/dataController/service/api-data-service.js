const { getTimseTicks } = require("../../../utils/tool");
const { sqlQuery } = require("../../../db/mysql");

function getSQL_apiList(appId, dbDateTicks) {
  const timeStart = dbDateTicks[0];
  const timeEnd = dbDateTicks[dbDateTicks.length - 1];
  const sql = `SELECT COUNT(*) AS sum, ok, url, ROUND(AVG(time)) AS time FROM api_report 
    WHERE appId='${appId}' AND createAt<= '${timeEnd}' AND createAt> '${timeStart}' 
    GROUP BY ok, url`;
  return sql;
}
async function getApiList(
  appId,
  timeEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const { dbDateTicks } = getTimseTicks(timeEnd, timeStep, steps);
  const sql = getSQL_apiList(appId, dbDateTicks);
  const res = await sqlQuery(sql);
  return { data: res };
}

function getSQL_apiData(appId, apiUrl, dbDateTicks, resDateTicks) {
  const timsStart = dbDateTicks[0];
  const timeEnd = dbDateTicks[dbDateTicks.length - 1];
  const sql_1 = `with temp AS (SELECT * 
    FROM api_report WHERE appId='${appId}' AND url='${apiUrl}'
    AND createAt<'${timeEnd}' AND createAt>='${timsStart}')
  `;
  let sql_2_strs = [];
  for (let i = 0; i < resDateTicks.length; i++) {
    const timeStart = dbDateTicks[i];
    const timeEnd = dbDateTicks[i + 1];
    const timeShow = resDateTicks[i];
    sql_2_strs.push(`
      (SELECT failSum, okSum, '${timeShow}' as date FROM 
      (SELECT COUNT(*) AS okSum ,1 as id FROM temp WHERE createAt>='${timeStart}' AND createAt<'${timeEnd}') AS a 
        INNER JOIN
      (SELECT COUNT(*) AS failSum ,1 as id FROM temp WHERE ok=0 AND createAt>='${timeStart}' AND createAt<'${timeEnd}') AS b
      on a.id = b.id)
    `);
  }
  const sql_2 = sql_2_strs.join(`
    UNION ALL
  `);

  const sql = `
  ${sql_1}
  ${sql_2}
  `;
  return sql;
}
async function getApiData(
  appId,
  apiUrl,
  timeEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const { dbDateTicks, resDateTicks } = getTimseTicks(timeEnd, timeStep, steps);
  const sql = getSQL_apiData(appId, apiUrl, dbDateTicks, resDateTicks);
  const res = await sqlQuery(sql);
  return { data: res, ticks: resDateTicks };
}

function getSql_apiCount(appId, apiUrl, dbDateTicks) {
  const sql_1 = `WITH temp AS (SELECT createAt 
    FROM api_report WHERE appId='${appId}'
    AND url='${apiUrl}' AND createAt>='${dbDateTicks[0]}' 
    AND createAt<'${dbDateTicks[dbDateTicks.length - 1]}' )`;
  let sql_2_strs = [];
  for (let i = 1; i < dbDateTicks.length; i++) {
    let dateStart = dbDateTicks[i - 1];
    let dateEnd = dbDateTicks[i];
    sql_2_strs.push(`
      SELECT COUNT(*) as num, '${dateStart}' as date FROM temp WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}'
    `);
  }
  const sql_2 = sql_2_strs.join(" UNION ALL ");
  const sql = sql_1 + sql_2;

  return sql;
}

function getSQL_apiSpeedPrice(
  appId,
  apiUrl,
  dbDateTicks,
  resDateTicks,
  countMap
) {
  const sql_1 = `WITH temp AS (SELECT time,createAt 
    FROM api_report WHERE appId='${appId}'
    AND url='${apiUrl}' AND createAt>='${dbDateTicks[0]}' 
    AND createAt<'${dbDateTicks[dbDateTicks.length - 1]}' )`;
  let sql_2_strs = [];
  for (let i = 0; i < resDateTicks.length; i++) {
    let sql_temp_strs = [];
    let dateStart = dbDateTicks[i];
    let dateEnd = dbDateTicks[i + 1];
    let num = countMap[dateStart];
    if (num === 0) {
      continue;
    }
    sql_temp_strs.push(
      `(SELECT time as speed, '30' as price, '${
        resDateTicks[i]
      }' as date from temp 
      WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY time LIMIT ${
        Math.ceil(num * 0.3) - 1
      },1) `
    );
    sql_temp_strs.push(
      `(SELECT time as speed, '60' as price, '${
        resDateTicks[i]
      }' as date from temp 
      WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY time LIMIT ${
        Math.ceil(num * 0.6) - 1
      },1) `
    );
    sql_temp_strs.push(
      `(SELECT time as speed, '80' as price, '${
        resDateTicks[i]
      }' as date from temp 
      WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY time LIMIT ${
        Math.ceil(num * 0.8) - 1
      },1) `
    );
    sql_temp_strs.push(
      `(SELECT time as speed, '90' as price, '${
        resDateTicks[i]
      }' as date from temp 
      WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY time LIMIT ${
        Math.ceil(num * 0.9) - 1
      },1) `
    );
    sql_temp_strs.push(
      `(SELECT time as speed, '95' as price,'${resDateTicks[i]}' as date 
        from temp WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY time LIMIT ${
        Math.ceil(num * 0.95) - 1
      },1) `
    );
    const sql_temp = sql_temp_strs.join(`
      UNION ALL
    `);
    sql_2_strs.push(sql_temp);
  }
  const sql_2 = sql_2_strs.join(`
    UNION ALL
  `);
  const sql_3 = `ORDER BY date , price DESC`;
  const sql = `
    ${sql_1}
    ${sql_2}
    ${sql_3}
  `;
  return sql;
}
async function getApiSpeedPrice(
  appId,
  apiUrl,
  timeEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const { dbDateTicks, resDateTicks } = getTimseTicks(timeEnd, timeStep, steps);

  // 筛选出该key在不同事件段的count
  const sql_apiCount = getSql_apiCount(appId, apiUrl, dbDateTicks);
  console.log("///////////////////////////////////////////");
  console.log(sql_apiCount);
  const apiCountRes = await sqlQuery(sql_apiCount);

  console.log(apiCountRes);
  let countMap = {};
  if (apiCountRes.every((t) => !t.num)) {
    return { res: [], ticks: [] };
  }
  for (let record of apiCountRes) {
    countMap[record.date] = record.num;
  }
  // 查询完整结果
  const sql = getSQL_apiSpeedPrice(
    appId,
    apiUrl,
    dbDateTicks,
    resDateTicks,
    countMap
  );
  console.log("++++++++++++++++++++++++++++++++++++++++++++");
  console.log(sql);
  const res = await sqlQuery(sql);

  console.log(res);
  return { data: res, ticks: resDateTicks };
}

function getSQL_apeErrorLog(appId, apiUrl, dbDateTicks) {
  const timeStart = dbDateTicks[0];
  const timeEnd = dbDateTicks[dbDateTicks.length - 1];
  const sql = `SELECT ip,time,status,response,createAt AS date FROM api_report 
    WHERE appId='${appId}' AND url='${apiUrl}' AND ok=0 AND createAt<= '${timeEnd}' AND createAt> '${timeStart}'
    ORDER BY date DESC`;
  return sql;
}
async function getApiErrorLog(
  appId,
  apiUrl,
  timeEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const { dbDateTicks } = getTimseTicks(timeEnd, timeStep, steps);
  const sql = getSQL_apeErrorLog(appId, apiUrl, dbDateTicks);
  const res = await sqlQuery(sql);
  return { data: res };
}

module.exports = {
  getApiList,
  getApiData,
  getApiErrorLog,
  getApiSpeedPrice,
};
