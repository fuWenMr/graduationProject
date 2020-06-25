const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../db/orm");

const App = sequelize.define(
  "App",
  {
    // 在这里定义模型属性
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    appName: {
      type: DataTypes.STRING,
      defaultValue: "默认服务器",
      allowNull: false,
    },
    appInfo: {
      type: DataTypes.STRING,
    },
    bindUrl: {
      type: DataTypes.STRING,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "apps",
  }
);

module.exports = App;
