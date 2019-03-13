

var database = require("../config/database.js");
var database = new database();
var conn = database.con();
var Config = require('../config/config.js');
var Config_URL = new Config();
var Public = require('../models/Public');


// load the a = require('../config/config.js');uth variables
var configAuth = require('../config/auth.js'); // use this one for testing




var mysql = require("mysql");
exports.view = function(req, res){
    res.render('../views/public/login');
};




exports.checklogin = function(req,res){

    var sess = req.session;
    sess.email = req.body.email;
    sess.password = req.body.password;
    var query1 = "SELECT * FROM ?? where email=? and password=?" ;
    var table1 = ["register", sess.email,sess.password];
    query1 = mysql.format(query1,table1);
    conn.query(query1, function(err1, rows1)
    {
        if(rows1.length==""){
            req.flash('error', 'Sorry Username and Password does not match.Please Register First.');
            res.redirect('/movie/login');
        } else{

            req.flash('success', 'You are login successfully.');
            res.redirect('/movie/movie_view');
        }
    });
};



exports.register_view = function(req, res){
    res.render('../views/public/register');
};

exports.register = function(req, res){
    try {
        var data = req.body;
        var datasssss = {
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            password:data.password,


        };

        Public.register(datasssss, function (err, info) {

            req.flash('success', 'Register Successfully');
            res.redirect('/movie/login');
        });

    }catch (ex){

    }
};

exports.logout = function(req, res){

    req.session.destroy(function (err) {
        if(err){
           console.log(err);
        }
        else{

            res.redirect('/movie/login');
        }
    })

};



exports.allview = function(req,res){
    var page = parseInt(req.query.page) ||1;
    // console.log(pageNo);
    var size = 3;//parseInt(req.query.size)
    var query = {}
    if(page < 0 || page === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
    }
    var offset = size * (page - 1);

    var limit = size;



    Public.most_liked(function (err,rowsCount) {

        // Find some documents
        Public.viewCount(function (err, rows, count) {

            var count = rows[0].count;
            if (err) {
                response = {"error": true, "message": "Error fetching data"}
            }

            Public.viewByOffset(limit, offset, function (err, rows, fields) {
                if (Config_URL.isDataEmpty(rows) && Config_URL.isLoginCheck(req)) {

                    if (err) {
                        response = {"error": true, "message": "Error fetching data"};
                    } else {
                        var totalPages = Math.ceil(count / size)

                        response = {"error": false, "message": rows, "pages": totalPages};
                    }

                    res.render('../views/public/movies', {data1: rowsCount, data: rows, totalPages, page});

                } else {
                    req.flash('error', "Please Login First");
                    res.redirect('/movie/login');

                }


            });
        });


    });
}


