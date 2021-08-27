const responseUtil = require("../../utilities/response");
const messageUtil = require("../../utilities/message");
const orderService = require("./orderService");
var mongoose = require('mongoose');

// ========================================= Add order

exports.addOrder = async (req, res) => {

    try {
        const orderData = {
            customer_id: req.body.customer_id,
            product_id: req.body.product_id,
            quantity: req.body.quantity,
            total_price: req.body.total_price,
            order_date: req.body.order_date
        }

        console.log(orderData)

        const isValid = orderService.validateOrder(orderData);

        if(isValid.error) {
            return responseUtil.validationErrorResponse(res, isValid.error.details[0].message, 
            isValid.error.details[0].message);
        }

        await orderService.saveOrder(orderData).then(resp => {
            responseUtil.successResponse(res, messageUtil.successResponse);
        });
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}

//================================================ Get all order

exports.getAllOrder = async (req, res) => {

    try {
        const result = await orderService.findAllOrder();

        if(result.length == 0) {
            responseUtil.notFoundErrorResponse(res, messageUtil.notfoundError);
        } else {
            responseUtil.successResponse(res, messageUtil.successResponse, result);
        }
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}

// ======================================================== Get order by id

exports.getOrderById = async (req, res) => {

    try {
        const isValid = mongoose.Types.ObjectId.isValid(req.params.id);

        if(isValid == false) {
            responseUtil.badRequestErrorResponse(res, messageUtil.badRequestError);
        }

        const result = await orderService.findOrderById(req.params.id);

        if(result !=null ) {
            responseUtil.successResponse(res, messageUtil.successResponse, result);
        } else {
            responseUtil.notFoundErrorResponse(res, messageUtil.notfoundError);
        }
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}