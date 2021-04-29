const mysql = require('mysql2/promise');
const bluebird = require('bluebird');

module.exports = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: 'todolist',
  password: process.env.MYSQL_PASSWORD,
  Promise: bluebird
})