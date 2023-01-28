var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'mysql-108168-0.cloudclusters.net', // Replace with your host name
  user: 'admin', // Replace with your database username
  password: 'Ar7dqAW5', // Replace with your database password
  database: 'mona_shop', // // Replace with your database Name
  port: 10009,
});
// var conn = mysql.createConnection({
//   host: 'localhost', // Replace with your host name
//   user: 'root', // Replace with your database username
//   password: '', // Replace with your database password
//   database: 'mona_shop', // // Replace with your database Name
// });
conn.connect(function (err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;
