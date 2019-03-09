
var mysql = require('mysql');

module.exports = function() {

    this.con = function () {
        var conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            port: '3306',
            database: 'movie'
        });
        return conn;
    }

}