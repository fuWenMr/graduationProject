const { DataTypes } = require("Sequelize");
const { sequelize } = require("../../db/orm");

const CountGrop = sequelize.define(
  "CountGrop",
  {
    // 在这里定义模型属性
    appId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    groupKey: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    items: {
      type: DataTypes.STRING,
      defaultValue: "[]",
    },
  },
  {
    timestamps: false,
    tableName: "count_groups",
  }
);

module.exports = CountGrop;
