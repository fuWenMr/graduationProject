const { getTimseTicks } = require("../../../utils/tool");
const { sqlQuery } = require("../../../db/mysql");

async function getCustomKeys(
  appId,
  startEnd = new Date().addHours(1),
  timeStep = 1,
  steps = 12
) {
  const sql = `SELECT DISTINCT countKey FROM count_report 
  WHERE appId=? AND createAt<? AND createAt>=?`;
  const values = [
    appId,
    startEnd.toString("yyyy-MM-dd HH:00:00"),
    startEnd.addHours(-timeStep * steps).toString("yyyy-MM-dd HH:00:00"),
  ];
  return sqlQuery(sql, values);
}

module.exports = {
  getCustomKeys,
};
