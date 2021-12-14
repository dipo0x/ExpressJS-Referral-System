var express = require('express');
var router = express.Router();
var homeRoutes = require('../controllers/index')
const { isAdmin } = require('../middleware/hasAuth')

router.get('/', homeRoutes.homepage)
router.get('/get-add-post', homeRoutes.get_add_post)
router.post('/add-post', homeRoutes.add_post)
router.get('/read-post/:id', homeRoutes.details)
router.post('/delete-post/:id', homeRoutes.delete)
router.get('/edit-post/:id', homeRoutes.get_edit)
router.post('/edit-post/:id', homeRoutes.edit)
router.post('/archive-post/:id', homeRoutes.archive)
module.exports = router;