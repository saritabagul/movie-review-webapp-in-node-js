
var database = require("../config/database.js");
var database = new database();
var conn = database.con();
var Config = require('../config/config.js');
var Config_URL = new Config();
var Admin = require('../models/Admin');

// load the a = require('../config/config.js');uth variables
var configAuth = require('../config/auth.js'); // use this one for testing


var mysql = require("mysql");
var uniqid = require("uniqid");
var fs = require('fs');




exports.viewLogin = function(req, res){
    res.render('../views/admin/login.ejs');
};



exports.checklogin = function(req,res){

    var sess = req.session;
    sess.email = req.body.email;
    sess.password = req.body.password;
    var query1 = "SELECT * FROM ?? where email=? and password=?" ;
    var table1 = ["admin_login", sess.email,sess.password];
    query1 = mysql.format(query1,table1);
    conn.query(query1, function(err1, rows1)
    {
        if(rows1.length==""){
            req.flash('error', 'Sorry Email and Password does not match..');
            res.redirect('/movie/admin/login');
        } else{


            req.flash('success', 'You are login successfully.');

            res.redirect('/admin/movie-view');
        }
    });
};


exports.logout = function(req, res){

    req.session.destroy(function (err) {
        if(err){
            console.log(err);
        }
        else{

            res.redirect('/movie/admin/login');
        }
    })

};




exports.view = function(req,res) {
    try{

        Admin.view(function (err, rows, fields) {
            if(Config_URL.isDataEmpty(rows) && Config_URL.isLoginCheck(req)){
                res.render('../views/admin/viewMovie',{data:rows});
            }
            else{
                req.flash('error', "Please Login first");
                res.redirect('/movie/admin/login');
            }
        });
    }catch (ex) {

    }
};

exports.add = function(req, res){

    var id = req.params.id;
    Admin.findById(id, function(err, rows, fields) {
        if(Config_URL.isLoginCheck(req)){
            if (Config_URL.isDataEmpty(rows)) {
                res.render('../views/admin/editMovie',{data:rows});
            } else {
                res.render('../views/admin/addMovie');
            };
        } else{
            req.flash('error', "Please Login first");
            res.redirect('/movie/admin/login');
        }

    });

};



exports.save = function(req, res){

    if (!req.files) {
        return res.status(400).send("No files were uploaded.");
    }

    try {
        var data = req.body;
        var uploadedFile=req.files.image;
        var fileExtension;
        var image_name;


        fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = uniqid() + '.' + fileExtension;

        var datasssss = {
            movie_name: data.movie_name,
            review: data.review,
            released_date: data.released_date,
            image:image_name,

        };

        // check the filetype before uploading it
        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the /public/assets/img directory
            uploadedFile.mv(`public/assets/img/${image_name}`,
                (err ) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    // send the player's details to the database

                    Admin.save(datasssss, function (err, info) {

                        req.flash('success', 'Movie saved Successfully');
                        res.redirect('/admin/movie-view');
                    });

                });
        } else {
            message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
            res.render('../views/admin/addMovie.ejs');
        }

    }catch (ex){

    }
};


exports.update = function(req, res){
    try{
        var data = req.body;
        var id = req.params.id;

        var datas = {
            movie_name: data.movie_name,
            review: data.review,
            released_date: data.released_date,
            id: id
        };
        Admin.update(datas, function(err, info) {
            req.flash('success', 'Movie updated Successfully');
            res.redirect('/admin/movie-view');
        });
    }catch (ex){

    }
};


exports.delete = function(req, res){
    try {
        var id =req.params.id;
        var image = req.params.image;


        data = {
            id: id,
            image:image,
        };

        Admin.getImage(id, function(err,result)
        {
            if (err) {
                return res.status(500).send(err);
            }


            var image = result[0].image;


            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }

                Admin.delete(data, function (err, info) {
                    req.flash('success', 'Movie deleted successfully');
                    res.redirect('/admin/movie-view');
                });
            });
        });
    }catch (ex){

    }
};



