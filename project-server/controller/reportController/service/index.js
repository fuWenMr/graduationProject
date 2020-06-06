const pvService = require("./pv-service");
const countService = require("./count-service");
const speedService = require("./speed-service");
const errorPvService = require("./errorPv-report-service");
const errorService = require("./error-report-service");
const staticMissService = require("./staticMiss-report-service");
const staticMissPvService = require("./staticMissPv-report-service");

const perfService = require("./perf-report-service");
const customPerfService = require("./customPerf-report-service");

const apifService = require("./api-report-service");

module.exports = {
  pvService,
  countService,
  speedService,
  errorPvService,
  errorService,
  staticMissService,
  staticMissPvService,
  perfService,
  customPerfService,
  apifService,
};
