var mysql = require('mysql');
var connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password  : '1234',
  database  : 'nkri'
});
connection.connect(function(error) {
  if(!!error) {
    console.log(error);
  } else {
    console.log("You're Connected . . .");
  }
});

module.exports = connection;