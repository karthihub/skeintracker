var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
//    port: 8081,
    user: 'root',
    password: 'root@123',
    database: 'sample'
});

module.exports = connection;