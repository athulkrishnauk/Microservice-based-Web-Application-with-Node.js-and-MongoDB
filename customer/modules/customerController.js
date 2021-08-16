const responseUtil = require("../../utilities/response");
const messageUtil = require("../../utilities/message");
const customerService = require("./customerService");
var mongoose = require('mongoose');

// ========================================= Add customer 

exports.addCustomer = async (req, res) => {

    try {
        const customerData = {
            customer_name: req.body.customer_name,
            email: req.body.email,
            phone_number: req.body.phone_number
        }

        const isValid = customerService.validateCustomer(customerData);

        if(isValid.error) {
            return responseUtil.validationErrorResponse(res, isValid.error.details[0].message, 
            isValid.error.details[0].message);
        }

        const result = await customerService.findOneCustomer(customerData);

        if(result == null) {
            await customerService.saveCustomer(customerData).then(resp => {
                responseUtil.successResponse(res, messageUtil.successResponse);
            });
        } else {
            responseUtil.existDocumentResponse(res, messageUtil.alreadyExist);
        }
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}

// ================================================= Get all customer

exports.getAllCustomer = async (req, res) => {

    try {
        const result = await customerService.findAllCustomer();

        if(result.length == 0) {
            responseUtil.notFoundErrorResponse(res, messageUtil.notfoundError);
        } else {
            responseUtil.successResponse(res, messageUtil.successResponse, result);
        }
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}

// ================================================= Get customer by id

exports.getCustomerById = async (req, res) => {

    try {
        const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

        if(isValid == false) {
            responseUtil.badRequestErrorResponse(res, messageUtil.badRequestError);
        }

        const result = await customerService.findCustomerById(req.params.id);

        if(result != null) {
            responseUtil.successResponse(res, messageUtil.successResponse, result);
        } else {
            responseUtil.notFoundErrorResponse(res, messageUtil.notfoundError);
        }
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}
