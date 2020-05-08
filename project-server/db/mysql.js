const mysql = require("mysql");
const dbConfig = require("../config").dataBaseConfig;

const { host, user, password, database } = dbConfig;

const pool = mysql.createPool({
  connectionLimit: 200,
  waitForConnections: true,
  host,
  user,
  password,
  database,
});

console.log("mysql 链接", user, password);
const sqlQuery = (sql, values = []) => {
  return new Promise((re, rj) => {
    pool.query(sql, values, function (error, results, fields) {
      // console.log('query error------------------------', error)
      // console.log(results)
      if (error) {
        rj(error);
        return;
      }
      re(results, fields);
    });
  });
};

module.exports = {
  sqlQuery,
};
