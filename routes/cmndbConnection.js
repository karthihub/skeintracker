var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "https://www.skeinlab.com",
//    port: 8081,
    user: 'root',
    password: '',
    database: 'sample'
});

module.exports = connection;