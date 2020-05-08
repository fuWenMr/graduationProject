const service = require("./service");

const services = {
  pv: service.pvService,
  speed: service.speedService,
  count: service.countService,
};

function queryRouter(request, ctx) {
  const { query } = request;
  const { t } = query;
  services[t] && services[t](query, request, ctx);
}

module.exports = queryRouter;
