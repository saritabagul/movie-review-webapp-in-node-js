
var PublicController = require('../controller/PublicController');
var AdminController = require('../controller/AdminController');


module.exports = function(app, passports){

    app.get('/movie/login', PublicController.view);
    app.post('/movie/checklogin', PublicController.checklogin);
    app.get('/movie/logout',PublicController.logout);
    app.get('/movie/register_user', PublicController.register_view);
    app.post('/movie/register', PublicController.register);
    app.get('/movie/movie_view', PublicController.allview);



    app.get('/movie/admin/login', AdminController.viewLogin);
    app.post('/movie/admin/checklogin', AdminController.checklogin);
    app.get('/movie/admin/logout', AdminController.logout);



    app.get('/admin/movie-view', AdminController.view);
    app.get('/admin/movie-add', AdminController.add);
    app.post('/admin/movie-save', AdminController.save);
    app.get('/admin/movie-edit/:id', AdminController.add);
    app.post('/admin/movie-update/:id',AdminController.update);
    app.get('/admin/movie-delete/:id', AdminController.delete);


}




