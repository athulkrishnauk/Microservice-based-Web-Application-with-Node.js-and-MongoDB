const { orderModel, validateOrder } = require('../models/order-model');

// Save order
exports.saveOrder = (data) => {
    const order = new orderModel(data);
    return order.save();
}

// Find all order
exports.findAllOrder = () => {
    return orderModel.find();
}

// Find Order by Id
exports.findOrderById = (id) => {
    return orderModel.findById(id);
}

// Find order by condition
exports.findOrderOne = (condition) => {
    return orderModel.findOne(condition);
}

exports.validateOrder = validateOrder;
