const userController = require("./user");
const appController = require("./app");

module.exports = {
  ...userController,
  appController,
};
