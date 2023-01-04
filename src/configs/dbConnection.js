var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'mysql-103199-0.cloudclusters.net', // Replace with your host name
  user: 'admin', // Replace with your database username
  password: 'k1gQEVAT', // Replace with your database password
  database: 'mona_shop', // // Replace with your database Name
  port: 10183,
});

conn.connect(function (err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
module.exports = conn;
