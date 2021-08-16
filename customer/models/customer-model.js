// Customer schema

const mongoose = require('mongoose');
const Joi = require("joi");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    customer_name: { type: String, required: true},
    email: { type: String, required: true, unique: true, trim: true },
    phone_number: { type: String, required: true, unique: true, trim: true }
},
{
    timestamps: true
});

customerSchema.index({email: 1});

// Validation function
function validateCustomer(customer) { 
    const schema = Joi.object({
        customer_name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone_number: Joi.string().required().pattern(/^\d{10,13}$/).message("Invalid Phone").min(10),
    });
    return schema.validate(customer);
}

const customerModel = mongoose.model('customer', customerSchema, 'clnCustomer');
module.exports.customerModel = customerModel;
module.exports.validateCustomer = validateCustomer;