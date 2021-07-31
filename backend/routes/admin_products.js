var express = require('express');
var router = express.Router();
var admin_productController = require('../controller/admin_productController');

// POST Request: http://localhost:3000/products
router.get('/', admin_productController.getAllProducts);

// GET Request: http://localhost:3000/products/create
router.get('/add-new-product', admin_productController.addnewProduct);

// POST Request: http://localhost:3000/products/save
router.post('/save', admin_productController.saveProduct);

// GET Request: http://localhost:3000/products/60f59cec7745c52930bff5e1
router.get('/:id', admin_productController.getProductById);

// DELETE Request: http://localhost:3000/products/60f59cec7745c52930bff5e1
router.post('/delete', admin_productController.deleteProduct);

// GET Request: http://localhost:3000/products/60f59cec7745c52930bff5e1
router.get('/update/:id', admin_productController.updateProduct);

// UPDATE Request: http://localhost:3000/products/60f59cec7745c52930bff5e1
router.post('/edit/:id', admin_productController.editProduct);

module.exports = router;


