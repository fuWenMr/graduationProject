const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config").dataBaseConfig;

const { host, user, password, database } = dbConfig;

console.log("看看输入", host, user, password, database);

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  pool: {
    max: 30,
    min: 0,
    acquire: 3000,
    idle: 3000,
  },
});

async function test() {
  try {
    await sequelize.authenticate();
    console.log(" sequelize 已链接到数据库");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

test();

module.exports = {
  sequelize,
  DataTypes,
};
