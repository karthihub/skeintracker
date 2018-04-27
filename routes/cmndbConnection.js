var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'sql12.freemysqlhosting.net',
    // port     : '3306',
    user     : 'sql12235075',
    password : 'CpDUEgrWqb',
    database : 'sql12235075'
});

module.exports = connection;