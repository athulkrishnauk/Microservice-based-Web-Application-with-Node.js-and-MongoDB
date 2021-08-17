// Product Schema

const mongoose = require('mongoose');
const Joi = require("joi");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_id: { type: String, required: true, unique: true},
    product_name: { type: String, required: true },
    product_price: { type: String, required: true }
},
{
    timestamps: true
});

productSchema.index({product_id: 1});

// Product validation function
function validateProduct(product) {
    const schema = Joi.object({
        product_id: Joi.string().required(),
        product_name: Joi.string().required(),
        product_price: Joi.string().required()
    });
    return schema.validate(product);
}

const productModel = mongoose.model("product", productSchema, 'clnProduct');
module.exports.productModel = productModel;
module.exports.validateProduct = validateProduct;


