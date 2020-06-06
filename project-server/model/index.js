const User = require("./models/user");
const App = require("./models/app");
const CountGroup = require("./models/countGroup");
const User_app = require("./models/user_app");

// 定义关联
User_app.hasOne(App, { foreignKey: "id", sourceKey: "appId" });
// App.belongsTo(User_app, {foreignKey: 'appId', targetKey: 'id'})

module.exports = {
  User,
  App,
  CountGroup,
  User_app,
};
