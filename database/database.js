const mysql=require('mysql2');

const pool = mysql.createPool({
    host: 'us-cdbr-east-03.cleardb.com',
	user: 'bb05fe2086dcf8',
    database: 'heroku_c1f7e15b22234a3',
    password: '380b49fd',
   
});
module.exports = pool.promise();
  