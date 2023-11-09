const mysql = require("mysql2");
const { key } = require("../key");
const pool = mysql.createPool({
  host: key.dataBaseHost,
  user: key.dataBaseUser,
  database: key.dataBase,
  password: key.password,
});
module.exports = pool.promise();
