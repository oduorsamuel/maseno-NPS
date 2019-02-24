const mysql = require('mysql');
const connection = mysql.createConnection({

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'computing_nps'
  });
  module.exports=connection;