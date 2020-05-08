const { Sequelize, DataTypes } = require("Sequelize");
const { sequelize } = require("../../db/orm");

const User = sequelize.define(
  "User",
  {
    // 在这里定义模型属性
    userName: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activeKey: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

module.exports = User;
