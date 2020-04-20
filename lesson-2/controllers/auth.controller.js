var db = require('../db');

module.exports.getLogin = function (req, res){
    res.render('auth/login');
}

module.exports.postLogin = function (req, res){
    var username = req.body.username;
    var password = req.body.password;

    var user = db.get('users').find({name: username}).value();
    if(!user){
        res.render('auth/login', {
            errors: ['Username is not exist!'],
            values: req.body
        })
        return;
    }
    if(user.password !== password){
        res.render('auth/login', {
            errors: ['Incorrect Password'],
            values: req.body
        });
        return;
    }
    //Set cookie
    res.cookie('username', user.name);
    res.redirect('/users');
}