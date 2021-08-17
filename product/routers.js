const express = require("express");
const router = express.Router();
const productController = require('./modules/productController');

// Add product
router.post('/api/product/addProduct', (req, res) => {
    productController.addProduct(req, res);
});

// get all product
router.get('/api/product/getAllProduct', (req, res) => {
    productController.getAllProduct(req, res);
});

// get product by id
router.get('/api/product/getProductById/:id', (req, res) => {
    productController.getProductById(req, res); 
});

module.exports = router;