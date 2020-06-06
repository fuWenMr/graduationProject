const service = require("./service");

const services = {
  pv: service.pvService,
  speed: service.speedService,
  count: service.countService,
  errorPv: service.errorPvService,
  error: service.errorService,
  staticMiss: service.staticMissService,
  staticMissPv: service.staticMissPvService,
  api: service.apifService,
  perf: service.perfService,
  custPref: service.customPerfService,
};

function queryRouter(request, ctx) {
  const { query } = request;
  const { t } = query;
  services[t] && services[t](query, request, ctx);
}

module.exports = queryRouter;
