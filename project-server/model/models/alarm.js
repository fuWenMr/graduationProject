const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../../db/orm");

const Alarm = sequelize.define(
  "Alarm",
  {
    // 在这里定义模型属性
    appId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    values: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: '[]'
    }
  },
  {
    tableName: "alarms",
  }
);

module.exports = Alarm;
