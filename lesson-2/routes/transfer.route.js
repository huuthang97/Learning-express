var express = require('express');
var router = express.Router();
var controller = require('../controllers/transfer.controller');

router.get('/create', controller.getCreate);
router.post('/create', controller.postCreate);

module.exports = router;