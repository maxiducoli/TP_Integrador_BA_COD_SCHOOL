const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');
router.get('/', controller.home);
router.get('/search', controller.search);
//router.post('/', controller.delete);
module.exports = router;