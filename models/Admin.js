
var database = require("../config/database.js");
var database = new database();
var conn = database.con();
var mysql = require("mysql");

module.exports.movies = function(callback) {
    var sql = "Select * from ??";
    var table = ["movie_list"];
    var queries = mysql.format(sql, table);
    conn.query(queries,callback);


}


//pagination//view with pagination on public

module.exports.viewByOffset = function (limit,offset,callback) {
    var sql = "select * from ?? limit ? offset ?";
    var table = ["movie_list",limit,offset];
    var queries = mysql.format(sql,table);   //mysql.format() --to remove sql injection
    conn.query(queries,callback);
}



module.exports.viewCount = function(callback){
    var sql = "SELECT COUNT(*) as count FROM ??";
    var table = ["movie_list"];
    var queries = mysql.format(sql, table);
    conn.query(queries,callback);
    //console.log(conn.query);
}


module.exports.register = function(data, callback) {
    var sql = "INSERT INTO ?? SET ?";
    var table = ["register", data];
    var queries = mysql.format(sql, table);
    conn.query(queries,callback);

}
