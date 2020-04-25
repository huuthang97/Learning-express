var db = require('../db');
var ids = require('short-id')

module.exports.getCreate = function (req, res) {
    res.render('transfer/create', { csrfToken: req.csrfToken() });
}

module.exports.postCreate = function (req, res) {
    var data = {
        id: ids.generate(),
        amount: parseInt(req.body.amount),
        accountId: req.body.accountId,
        userId: req.signedCookies.username
    }
    db.get('transfer').push(data).write();
    res.redirect('/transfer/create');
    
}