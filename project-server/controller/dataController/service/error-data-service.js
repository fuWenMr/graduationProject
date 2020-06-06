const { getTimseTicks } = require("../../../utils/tool");
const { sqlQuery } = require("../../../db/mysql");

function getSQL_countData(appId, dbDateTicks, resDateTicks) {
  const timsStart = dbDateTicks[0];
  const timeEnd = dbDateTicks[dbDateTicks.length - 1];
  const sql_1 = `with temp AS (SELECT * 
    FROM error_report WHERE appId='${appId}' 
    AND createAt<'${timeEnd}' AND createAt>='${timsStart}')
  `;
  let sql_2_strs = [];
  for (let i = 0; i < resDateTicks.length; i++) {
    const timeStart = dbDateTicks[i];
    const timeEnd = dbDateTicks[i + 1];
    const timeShow = resDateTicks[i];
    sql_2_strs.push(
      `(SELECT COUNT(*) as sum, 'error' AS type, '${timeShow}' as date FROM temp WHERE createAt>='${timeStart}' AND createAt<'${timeEnd}' )
      UNION ALL
      (SELECT COUNT(*) as sum, 'errorPv' AS type, '${timeShow}' as date FROM error_pv_report WHERE appId='${appId}' AND createAt>='${timeStart}' AND createAt<'${timeEnd}' )`
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

async function getErrorData(
  appId,
  timeEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const { dbDateTicks, resDateTicks } = getTimseTicks(timeEnd, timeStep, steps);
  const sql = getSQL_countData(appId, dbDateTicks, resDateTicks);

  const res = await sqlQuery(sql);

  return { data: res, ticks: resDateTicks };
}

function getSQL_errorList(appId, dbDateTicks) {
  const sql = `SELECT COUNT(*) as sum, type, file, lineno, colno, MAX(createAt) AS date 
  FROM error_report 
  WHERE appId='${appId}' AND createAt<= '${
    dbDateTicks[dbDateTicks.length - 1]
  }' AND createAt> '${dbDateTicks}' 
  GROUP BY type, file, lineno, colno  ORDER BY sum DESC LIMIT 0,20`;
  return sql;
}

async function getErrorList(
  appId,
  timeEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const { dbDateTicks } = getTimseTicks(timeEnd, timeStep, steps);
  const sql = getSQL_errorList(appId, dbDateTicks);

  const res = await sqlQuery(sql);

  return { data: res };
}

function getSQL_staticMissList(appId, dbDateTicks) {
  return `SELECT COUNT(*) as sum, url, MAX(createAt) AS date 
  from static_miss_report WHERE appId='${appId}' AND createAt> '${dbDateTicks[0]}'
  GROUP BY url  ORDER BY sum DESC LIMIT 0,60`;
}

async function getStaticMissList(
  appId,
  timeEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const { dbDateTicks } = getTimseTicks(timeEnd, timeStep, steps);
  const sql = getSQL_staticMissList(appId, dbDateTicks);

  const res = await sqlQuery(sql);

  return { data: res };
}

function getSQL_errorDetils(appId, dbDateTicks) {
  const sql = `SELECT * FROM error_report 
    WHERE appId='${appId}'AND createAt>='${dbDateTicks[0]}' AND createAt<'${
    dbDateTicks[dbDateTicks.length - 1]
  }'
    ORDER BY createAt DESC`;
  return sql;
}

async function getErrorDetail(
  appId,
  timeEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const { dbDateTicks } = getTimseTicks(timeEnd, timeStep, steps);
  const sql = getSQL_errorDetils(appId, dbDateTicks);

  const res = await sqlQuery(sql);

  return { data: res };
}

module.exports = {
  getErrorData,
  getErrorList,
  getStaticMissList,
  getErrorDetail,
};
