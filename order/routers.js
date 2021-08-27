const express = require("express");
const router = express.Router();
const orderController = require('./modules/orderController');

// Add order
router.post('/api/order/addOrder', (req, res) => {
    orderController.addOrder(req, res);
});

// Get all order
router.get('/api/order/getAllOrder', (req, res) => {
    orderController.getAllOrder(req, res);
});

// Get order by id
router.get('/api/order/getOrderById/:id', (req, res) => {
    orderController.getOrderById(req, res);                      
});
                               
module.exports = router; 