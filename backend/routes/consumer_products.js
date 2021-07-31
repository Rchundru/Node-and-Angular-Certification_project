var express = require('express');
var router = express.Router();
var consumer_productController = require('../controller/consumer_productController');

// POST Request: http://localhost:3000/products
router.get('/', consumer_productController.getAllProducts);

// GET Request: http://localhost:3000/products/60f59cec7745c52930bff5e1
router.get('/:id', consumer_productController.getProductById);

module.exports = router;


