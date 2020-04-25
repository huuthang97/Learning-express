
var ids = require('short-id');
var db = require('../db');

module.exports = function (req, res, next) {
    var sessionId = req.signedCookies.sessionId;
    if(!sessionId){
        var sessionId = ids.generate();
        res.cookie('sessionId', sessionId, {
        signed: true
        });
    db.get('session').push({id: sessionId}).write();
    }
    
    next();
}