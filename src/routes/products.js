const express = require('express');
const router = express.Router();

const controller = require('../controllers/productsController');

router.get('/product/:id', controller.product);
router.get('/add', controller.add);
router.get('/edit/:id', controller.edit);
router.get('/search/:resultado', controller.search);
module.exports = router;