const { customerModel, validateCustomer } = require('../models/customer-model');
 
// save customer 
exports.saveCustomer = (data) => {
    const customer = new customerModel(data);
    return customer.save();
}

// Find all customer
exports.findAllCustomer = () => {
    return customerModel.find();
}

// Find customer by id
exports.findCustomerById = (id) => {
    return customerModel.findById(id);
}

// Find customer by data
exports.findOneCustomer = (condition) => {
    return customerModel.findOne(condition);
}

exports.validateCustomer = validateCustomer;