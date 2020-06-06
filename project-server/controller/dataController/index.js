const dataSrvice = require("./service");
const speedService = require("./service/speed-data-service");
const countDataService = require("./service/count-data-service");
const pvDataService = require("./service/pv-data-service");
const errorDataService = require("./service/error-data-service");
const apiDataService = require("./service/api-data-service");

async function getSpeedAvg(ctx) {
  console.log("getSpeedAvg-----");
  // TODO 校验用户登录
  // const userName = ctx.session.user;
  // if (!userName) {
  //   return ;
  // }
  const { appId, timeEnd, timeStep, steps } = ctx.request.query;
  console.log({ appId });
  const { res, ticks } = await speedService.getSpeedAvg(
    appId,
    timeEnd,
    timeStep,
    steps
  );
  ctx.success({ resType: 0, data: res, ticks });
}

async function getSpeedPrice(ctx) {
  console.log("getSpeedPrice-----");
  // TODO 校验用户登录
  const { appId, speedKey, timeEnd, timeStep, steps } = ctx.request.query;

  const { res, ticks } = await speedService.getSpeedPrice(
    appId,
    speedKey,
    timeEnd,
    timeStep,
    steps
  );
  ctx.success({ resType: 0, data: res, ticks });
}

async function getCustomKeys(ctx) {
  console.log("getCustomKeys-----");
  // TODO 校验用户登录

  const { appId, timeEnd, timeStep, steps } = ctx.request.query;

  const rows = await dataSrvice.getCustomKeys(appId, timeEnd, timeStep, steps);
  let customKeys = [];
  for (let row of rows) {
    customKeys.push(row["countKey"]);
  }
  ctx.success({ resType: 0, customKeys });
}

async function getCountData(ctx) {
  console.log("getCountData-----");
  // TODO 校验用户登录

  const { appId, countKeys = "", timeEnd, timeStep, steps } = ctx.request.query;
  let countKeys_ = [];
  if (!countKeys || countKeys === "[]") {
    const rows = await dataSrvice.getCustomKeys(
      appId,
      timeEnd,
      timeStep,
      steps
    );
    const limitRows = rows.splice(0, 7);
    for (let row of limitRows) {
      countKeys_.push(row["countKey"]);
    }
  } else {
    countKeys_ = JSON.parse(countKeys);
  }
  if (countKeys_.length === 0) {
    ctx.success({ resType: 0, data: [], ticks: [] });
  } else {
    const { data, ticks } = await countDataService.getCountData(
      appId,
      countKeys_,
      timeEnd,
      timeStep,
      steps
    );
    ctx.success({ resType: 0, data, ticks });
  }
}

async function getPvCount(ctx) {
  console.log("getPvCount-----");
  // TODO 校验用户登录

  const { appId, timeEnd, timeStep, steps } = ctx.request.query;
  const { data, ticks } = await pvDataService.getPvCount(
    ...[appId, timeEnd, timeStep, steps]
  );
  ctx.success({ resType: 0, data, ticks });
}

async function getErrorData(ctx) {
  console.log("getErrorData-----");
  // TODO 校验用户登录

  const { appId, timeEnd, timeStep, steps } = ctx.request.query;
  const { data, ticks } = await errorDataService.getErrorData(
    ...[appId, timeEnd, timeStep, steps]
  );
  ctx.success({ resType: 0, data, ticks });
}

async function getErrorList(ctx) {
  console.log("getErrorList-----");
  // TODO 校验用户登录

  const { appId, timeEnd, timeStep, steps } = ctx.request.query;
  const { data } = await errorDataService.getErrorList(
    ...[appId, timeEnd, timeStep, steps]
  );
  ctx.success({ resType: 0, data });
}

async function getStaticMissList(ctx) {
  console.log("getStaticMissList-----");
  // TODO 校验用户登录

  const { appId, timeEnd, timeStep, steps } = ctx.request.query;
  const { data } = await errorDataService.getStaticMissList(
    ...[appId, timeEnd, timeStep, steps]
  );
  ctx.success({ resType: 0, data });
}

async function getErrorDetail(ctx) {
  console.log("getErrorDetail-----");
  // TODO 校验用户登录

  const { appId, timeEnd, timeStep, steps } = ctx.request.query;
  const { data } = await errorDataService.getErrorDetail(
    ...[appId, timeEnd, timeStep, steps]
  );
  ctx.success({ resType: 0, data });
}

async function getApiList(ctx) {
  console.log("getApiList-----");
  // TODO 校验用户登录

  const { appId, timeEnd, timeStep, steps } = ctx.request.query;
  const { data } = await apiDataService.getApiList(
    ...[appId, timeEnd, timeStep, steps]
  );
  ctx.success({ resType: 0, data });
}

async function getApiData(ctx) {
  console.log("getApiList-----");
  // TODO 校验用户登录
  const { appId, apiUrl, timeEnd, timeStep, steps } = ctx.request.query;
  const { data } = await apiDataService.getApiData(
    ...[appId, apiUrl, timeEnd, timeStep, steps]
  );
  ctx.success({ resType: 0, data });
}

async function getApiErrorLog(ctx) {
  console.log("getApiList-----");
  // TODO 校验用户登录
  const { appId, apiUrl, timeEnd, timeStep, steps } = ctx.request.query;
  const { data } = await apiDataService.getApiErrorLog(
    ...[appId, apiUrl, timeEnd, timeStep, steps]
  );
  ctx.success({ resType: 0, data });
}

async function getApiSpeedPrice(ctx) {
  console.log("getApiList-----");
  // TODO 校验用户登录
  const { appId, apiUrl, timeEnd, timeStep, steps } = ctx.request.query;
  const { data, ticks } = await apiDataService.getApiSpeedPrice(
    ...[appId, apiUrl, timeEnd, timeStep, steps]
  );
  ctx.success({ resType: 0, data, ticks });
}

module.exports = {
  getErrorData,
  getErrorList,
  getStaticMissList,
  getErrorDetail,
  getSpeedAvg,
  getSpeedPrice,
  getCountData,
  getCustomKeys,
  getPvCount,
  getApiList,
  getApiErrorLog,
  getApiData,
  getApiSpeedPrice,
};

/**
 * 样例
 */

// async function getCountData(ctx) {
//   console.log('getCountData-----')
//   // TODO 校验用户登录

//   const {
//     appId,
//     timeEnd,
//     timeStep,
//     steps,
//   } = ctx.request.query;

// }
