const { Sequelize, DataTypes } = require("Sequelize");
const { sequelize } = require("../../db/orm");

const User_app = sequelize.define(
  "user_app",
  {
    // 在这里定义模型属性
    userName: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    appId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    active: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "user_app",
  }
);

module.exports = User_app;
