const { productModel, validateProduct } = require('../models/product-model');

// Save product
exports.saveProduct = (data) => {
    const product = new productModel(data);
    return product.save();
}  

// Find all product
exports.findAllProduct = () => {
    return productModel.find();
}

// Find product by id
exports.findProductById = (id) => {
    return productModel.findById(id);
}

// Find product by condition
exports.findOneProduct = (condition) => {
    return productModel.findOne(condition);
}

exports.validateProduct = validateProduct;