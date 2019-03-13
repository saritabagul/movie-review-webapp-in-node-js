
var database = require("../config/database.js");
var database = new database();
var conn = database.con();
var mysql = require("mysql");


//view for admin
module.exports.view = function (callback) {
    var sql = "select * from ??";
    var table = ["movie_list"];
    var queries = mysql.format(sql,table);
    conn.query(queries,callback);
}


// article save
module.exports.save = function(data, callback) {
    var sql = "INSERT INTO ?? SET ?";
    var table = ["movie_list", data];
    var queries = mysql.format(sql, table);
    conn.query(queries,callback);
}

module.exports.findById = function(id,callback) {
    var sql = "SELECT * from ?? where id=?";   // here ??-for string and ?-data from table
    var table = ["movie_list", id];
    var queries = mysql.format(sql, table);
    conn.query(queries, callback);
}


module.exports.update = function(data,callback) {
    var sql = "Update ?? SET ? where id=?";
    var table = ["movie_list", data,data.id];
    var queries = mysql.format(sql, table);
    conn.query(queries,callback);
}

module.exports.delete = function(data,callback) {
    var sql = "Delete From ?? where id=?";
    var table = ["movie_list",data.id];
    var queries = mysql.format(sql, table);
    conn.query(queries,callback);
}


module.exports.getImage = function(id,callback) {
    var sql = "SELECT image from ?? where id=?";   // here ??-for string and ?-data from table
    var table = ["movie_list", id];
    var queries = mysql.format(sql, table);
    conn.query(queries, callback);
}

