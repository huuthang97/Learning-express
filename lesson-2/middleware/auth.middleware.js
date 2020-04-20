var db = require('../db');

module.exports.requireAuth = function (req, res, next) {
    var cookieName = req.cookies.username
    if(!cookieName){
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({name: cookieName}).value();
    if(!user){
        res.redirect('/auth/login');
        return;
    }

    next();

}