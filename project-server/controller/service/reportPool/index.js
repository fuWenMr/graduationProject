const Reporter = require("../report");

let reporterPool = {};

const getPool = function () {
  return reporterPool;
};

function resetPool() {
  const pool = reporterPool;
  reporterPool = {};
  return pool;
}

function getReport(id) {
  const pool = getPool && getPool();
  let reporter = pool[id];
  if (reporter) {
    return reporter;
  }
  reporter = new Reporter(id);
  pool[id] = reporter;
  return reporter;
}

module.exports = {
  getPool,
  resetPool,
  getReport,
};
