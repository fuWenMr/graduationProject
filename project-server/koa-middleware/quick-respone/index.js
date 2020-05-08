/**
 * response
 * @param ctx
 * @param data 数据
 * @param code 错误码 || [错误码, 错误描述]
 * @param message 错误描述
 */
const response = (ctx, data, isOk, extra = {}) => {
  if (typeof code == "object") {
    message = code[1];
    code = code[0];
  }
  ctx.body = {
    isOk,
    data,
    ...extra,
  };
};

/**
 * response 成功
 * @param ctx
 * @param data 数据
 */
const success = (ctx, data) => {
  response(ctx, data, true);
};

/**
 * response 异常
 * @param ctx
 * @param code 错误码 || [错误码, 错误描述]
 * @param message 错误描述
 */
const error = (ctx, errCode = 1, errMsg = "ERROR", data = "") => {
  if (typeof code === "object") {
    message = code[1];
    code = code[0];
  }
  response(ctx, data, false, { errCode, errMsg });
};

module.exports = async (ctx, next) => {
  ctx.success = success.bind(null, ctx);
  ctx.error = error.bind(null, ctx);
  await next();
};
