const responseUtil = require("../../utilities/response");
const messageUtil = require("../../utilities/message");
const productService = require("./productService");
var mongoose = require('mongoose');

// ================================================== Add product

exports.addProduct = async(req, res) => {

    try {
        const productData = {
            product_id: req.body.product_id,
            product_name: req.body.product_name,
            product_price: req.body.product_price
        }

        const isValid = productService.validateProduct(productData);

        if(isValid.error) {
            return responseUtil.validationErrorResponse(res, isValid.error.details[0].message, 
            isValid.error.details[0].message);
        }

        const result = await productService.findOneProduct(productData);

        if(result == null) {
            await productService.saveProduct(productData).then(resp => {
                responseUtil.successResponse(res, messageUtil.successResponse);
            });
        } else {
            responseUtil.existDocumentResponse(res, messageUtil.alreadyExist);
        }
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}

// ================================================ Get all product

exports.getAllProduct = async (req, res) => {

    try {
        const result = await productService.findAllProduct();

        if(result.length == 0) {
            responseUtil.notFoundErrorResponse(res, messageUtil.notfoundError);
        } else {
            responseUtil.successResponse(res, messageUtil.successResponse, result);
        }
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}

// ============================================== Get product by id

exports.getProductById = async (req, res) => {

    try {
        const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

        if(isValid == false) {
            return responseUtil.badRequestErrorResponse(res, messageUtil.badRequestError);
        }

        const result = await productService.findProductById(req.params.id);

        if(result != null) {
            responseUtil.successResponse(res, messageUtil.successResponse, result);
        } else {
            responseUtil.notFoundErrorResponse(res, messageUtil.notfoundError);
        }
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}