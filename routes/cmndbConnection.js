var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'https://node10683-skeintracker.mj.milesweb.cloud/',
    // port     : '3306',
    user     : 'root',
    password : 'BEAnql57179',
    database : 'SkeinTrackerDB'
});

module.exports = connection;