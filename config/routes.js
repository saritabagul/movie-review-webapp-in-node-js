
var AdminController = require('../controller/AdminController');


module.exports = function(app, passports){

    app.get('/movie/login', AdminController.view);
    app.post('/movie/checklogin', AdminController.checklogin);
    app.get('/movie/logout', AdminController.logout);
    app.get('/movie/register_user', AdminController.register_view);
    app.post('/movie/register', AdminController.register);
    app.get('/movie/movie_view', AdminController.allview);




}




