var db = require('../db');
var md5 = require('md5');

module.exports.getLogin = function (req, res){
    res.render('auth/login');
}

module.exports.postLogin = function (req, res){
    var username = req.body.username;
    var password = req.body.password;
    var hashedPass = md5(password);

    var user = db.get('users').find({name: username}).value();
    if(!user){
        res.render('auth/login', {
            errors: ['Username is not exist!'],
            values: req.body
        })
        return;
    }
    if(user.password !== hashedPass){
        res.render('auth/login', {
            errors: ['Incorrect Password'],
            values: req.body
        });
        return;
    }
    //Set cookie
    res.cookie('username', user.name, {
        signed: true
    });
    res.redirect('/users');
}