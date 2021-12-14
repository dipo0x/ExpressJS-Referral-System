var express = require('express');
var router = express.Router();
var homeRoutes = require('../controllers/index')
const { isAdmin } = require('../middleware/hasAuth')

router.get('/', homeRoutes.homepage)
module.exports = router;