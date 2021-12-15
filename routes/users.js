var express = require('express');
var router = express.Router();
var usersRoutes = require('../controllers/users')

router.get('/login', usersRoutes.get_login);
router.post('/login', usersRoutes.login);
router.get('/logout', usersRoutes.logout);

router.get('/register', usersRoutes.get_register)
router.post('/register', usersRoutes.register)

router.get('/register/rl:id', usersRoutes.get_referral_register)
router.post('/register/rl:id', usersRoutes.referral_register)

router.get('/profile', usersRoutes.profile)
router.get('/referred', usersRoutes.referred)
router.get('/profile/rl:id', usersRoutes.user_profile)
module.exports = router;