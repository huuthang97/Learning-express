var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');


router.get('/', controller.index);
router.get('/search', controller.search);
router.get('/create', controller.getCreate);
router.post("/create",
    upload.single('avatar'),
    validate.postCreate, 
    controller.postCreate);
router.get("/:id", controller.view);


module.exports = router;