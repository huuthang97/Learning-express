var db = require('../db');
module.exports.products = function (req, res) {
    var currentPage = req.query.page ? parseInt(req.query.page) : 1;
    var perPage = 8;
    var start = (currentPage - 1) * perPage;
    var end = parseInt(currentPage * perPage);

    var totalProducts = db.get('products').size().value();
    var totalPage = Math.ceil(totalProducts / perPage);
    
    var products = db.get('products').value().slice(start, end);
    res.render('products', {
        products: products,
        totalPage: totalPage,
        currentPage: currentPage
    });
    
}