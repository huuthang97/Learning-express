var db = require('../db');
var ids = require('short-id');

// console.log(db.users)

module.exports.index = function (req, res) {
    res.render('users/index', {
      users: db.get('users').value()
    });
  }

module.exports.search = function (req, res) {
    var q = req.query.q;
    // console.log(req.query.q)
    resultSearch = db.get('users').value().filter(function(user){
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })
  
    res.render('users/index', {
      users: resultSearch
    })
  }

module.exports.getCreate = function (req, res) {
    res.render("users/create");
  }

module.exports.postCreate = function (req, res) {
    req.body.id = ids.generate();
    db.get('users').push(req.body).write();
    res.redirect("/users")
  }

module.exports.view = function (req, res) {
    var id = req.params.id
    var user = db.get('users').find({id: id}).value();
    res.render('users/view', {user: user})
    
  }