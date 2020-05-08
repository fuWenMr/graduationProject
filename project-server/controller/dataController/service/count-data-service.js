const { getTimseTicks } = require("../../../utils/tool");
const { sqlQuery } = require("../../../db/mysql");

function getSQL_countData(appId, countKeys, dbDateTicks, resDateTicks) {
  const timsStart = dbDateTicks[0];
  const timeEnd = dbDateTicks[dbDateTicks.length - 1];
  const sql_1 = `with temp AS (SELECT * 
    FROM count_report WHERE appId='${appId}' 
    AND createAt<'${timeEnd}' AND createAt>='${timsStart}' AND countKey IN ('${countKeys.join(
    "','"
  )}'))
  `;
  let sql_2_strs = [];
  for (let i = 0; i < resDateTicks.length; i++) {
    const timeStart = dbDateTicks[i];
    const timeEnd = dbDateTicks[i + 1];
    const timeShow = resDateTicks[i];
    sql_2_strs.push(
      `(SELECT SUM(count) as count, countKey, '${timeShow}' as date FROM temp WHERE createAt>='${timeStart}' AND createAt<'${timeEnd}' GROUP BY countKey)`
    );
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

async function getCountData(
  appId,
  countKeys,
  timeEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const { dbDateTicks, resDateTicks } = getTimseTicks(timeEnd, timeStep, steps);
  const sql = getSQL_countData(appId, countKeys, dbDateTicks, resDateTicks);
  console.log(sql);

  const res = await sqlQuery(sql);

  return { data: res, ticks: resDateTicks };
}

module.exports = {
  getCountData,
};
