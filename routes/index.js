var express = require('express');
var router = express.Router();
var homeRoutes = require('../controllers/index')

router.get('/', homeRoutes.homepage)
module.exports = router;