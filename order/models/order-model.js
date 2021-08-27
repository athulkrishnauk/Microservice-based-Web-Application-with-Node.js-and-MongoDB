// Order schema

const mongoose = require('mongoose');
const Joi = require("joi");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    customer_id: { type: Schema.Types.ObjectId, ref:'customer', required: true },
    product_id: { type: Schema.Types.ObjectId, ref:'product', required: true },
    quantity: { type: String, required: true },
    total_price: { type: String, required: true },
    order_date: { type: Date, required: true },
},
{
    timestamps: true
});

orderSchema.index({order_date: 1});

// Order Validation function
function validateOrder(order){
    const schema = Joi.object({
        customer_id: Joi.mongoId(),
        product_id: Joi.mongoId(),
        quantity: Joi.string().required(),
        total_price: Joi.string().required(),
        order_date: Joi.date().required()
    });
    return schema.validate(order);
}

const orderModel = mongoose.model("order", orderSchema, "clnOrder");
module.exports.orderModel = orderModel;
module.exports.validateOrder = validateOrder;   