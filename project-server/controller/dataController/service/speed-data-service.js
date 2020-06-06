const { dbDateFormat, frontDateFormat } = require("./until");
const { getTimseTicks } = require("../../../utils/tool");
const { sqlQuery } = require("../../../db/mysql");

function getSpeedAvgSql(appId, DateStart, timeStep, steps) {
  let times = [DateStart.toString(dbDateFormat)];
  let sql_union_strs = [];
  let ticks = [];
  for (let i = 0; i < steps; i++) {
    DateStart.addHours(-timeStep);
    let timeStart = DateStart.toString(dbDateFormat);
    let timeStart_ = DateStart.toString(frontDateFormat);
    ticks.push(timeStart_);
    let timeEnd = times[i];
    times.push(timeStart);
    let sql_union_str = `
    SELECT speedKey, ROUND(AVG(speed)) as speedAvg, '${timeStart_}' as date 
      FROM temp WHERE createAt<'${timeEnd}' AND createAt>='${timeStart}' GROUP BY speedKey
    `;
    sql_union_strs.push(sql_union_str);
  }
  const sql_union_str_ = sql_union_strs.join(" UNION ALL ");
  const sql = `
  with temp as (SELECT  speedKey, speed, createAt 
		FROM speed_report 
    WHERE appId='${appId}' AND createAt<'${times[0]}' AND createAt>='${times[steps]}' )
  SELECT * FROM (
    ${sql_union_str_}
  ) as a0 ORDER BY date, speedKey
  `;
  ticks = ticks.reverse();
  return { sql, ticks };
}

async function getSpeedAvg(appId, timeStart, timeStep = 1, steps = 12) {
  timeStart = timeStart ? new Date(timeStart) : new Date();
  const { sql, ticks } = getSpeedAvgSql(appId, timeStart, timeStep, steps);
  // console.log(sql)
  let res = await sqlQuery(sql);
  // console.log(JSON.parse(JSON.stringify(res)));
  return { res, ticks };
}

/**
 * =================================================================================================
 */

function getSql_speedKeyCount(appId, speedKey, dbDateTicks) {
  const sql_1 = `WITH temp AS (SELECT speedKey,createAt 
    FROM speed_report WHERE appId='${appId}'
    AND speedKey='${speedKey}' AND createAt>='${
    dbDateTicks[0]
  }' AND createAt<'${dbDateTicks[dbDateTicks.length - 1]}' )`;
  let sql_2_strs = [];
  for (let i = 1; i < dbDateTicks.length; i++) {
    let dateStart = dbDateTicks[i - 1];
    let dateEnd = dbDateTicks[i];
    sql_2_strs.push(`
      SELECT COUNT(speedKey) as num, '${dateStart}' as date FROM temp WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}'
    `);
  }
  const sql_2 = sql_2_strs.join(" UNION ALL ");
  const sql = sql_1 + sql_2;

  return sql;
}

function getSql_speedPrice(
  appId,
  speedKey,
  dbDateTicks,
  resDateTicks,
  countMap
) {
  const sql_1 = `WITH temp AS (SELECT speed,createAt 
    FROM speed_report WHERE appId='${appId}'
    AND speedKey='${speedKey}' AND createAt>='${
    dbDateTicks[0]
  }' AND createAt<'${dbDateTicks[dbDateTicks.length - 1]}' )`;
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
      `(SELECT speed, '30' as price, '${resDateTicks[i]}' as date from temp 
      WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY speed LIMIT ${
        Math.ceil(num * 0.3) - 1
      },1) `
    );
    sql_temp_strs.push(
      `(SELECT speed, '60' as price, '${resDateTicks[i]}' as date from temp 
      WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY speed LIMIT ${
        Math.ceil(num * 0.6) - 1
      },1) `
    );
    sql_temp_strs.push(
      `(SELECT speed, '80' as price, '${resDateTicks[i]}' as date from temp 
      WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY speed LIMIT ${
        Math.ceil(num * 0.8) - 1
      },1) `
    );
    sql_temp_strs.push(
      `(SELECT speed, '90' as price, '${resDateTicks[i]}' as date from temp 
      WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY speed LIMIT ${
        Math.ceil(num * 0.9) - 1
      },1) `
    );
    sql_temp_strs.push(
      `(SELECT speed, '95' as price,'${resDateTicks[i]}' as date 
        from temp WHERE createAt>='${dateStart}' AND createAt<'${dateEnd}' ORDER BY speed LIMIT ${
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

async function getSpeedPrice(appId, speedKey, timeEnd, timeStep, steps) {
  const { dbDateTicks, resDateTicks } = getTimseTicks(timeEnd, timeStep, steps);
  // 筛选出该key在不同事件段的count
  const sql_speedCount = getSql_speedKeyCount(appId, speedKey, dbDateTicks);
  // console.log(sql_speedCount);
  const speedCountRes = await sqlQuery(sql_speedCount);
  let countMap = {};
  if (speedCountRes.every((t) => !t.num)) {
    return { res: [], ticks: [] };
  }
  for (let record of speedCountRes) {
    countMap[record.date] = record.num;
  }
  // console.log(speedCountRes);
  // 查数据库得到结果
  const sql = getSql_speedPrice(
    appId,
    speedKey,
    dbDateTicks,
    resDateTicks,
    countMap
  );
  // console.log(sql);
  const res = await sqlQuery(sql);
  // console.log(res);
  return { res, ticks: resDateTicks };
}

module.exports = {
  getSpeedAvg,
  getSpeedPrice,
};
