const express = require("express");
const router = express.Router();
const customerController = require('./modules/customerController');

// Add customer
router.post('/api/customer/addCustomer', (req, res) => {
    customerController.addCustomer(req, res);
});

// Get all customer
router.get('/api/customer/getAllCustomer', (req, res) => {
    customerController.getAllCustomer(req, res);
});

// Get customer by id
router.get('/api/customer/getCustomerById/:id', (req, res) => {
    customerController.getCustomerById(req, res);
});

module.exports = router;