var express = require('express');
var router = express.Router();
var usersRoutes = require('../controllers/users')

router.get('/login', usersRoutes.get_login);
router.post('/login', usersRoutes.login);
router.get('/register', usersRoutes.get_register)
router.post('/register', usersRoutes.register)
module.exports = router;