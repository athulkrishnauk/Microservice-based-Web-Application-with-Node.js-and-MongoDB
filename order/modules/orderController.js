const responseUtil = require("../../utilities/response");
const messageUtil = require("../../utilities/message");
const orderService = require("./orderService");
var mongoose = require('mongoose');
const axios = require('axios');

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
            axios.get("http://localhost:5006/api/customer/getCustomerById/"+result.customer_id).then((resp) => {
                
                var orderObject = {
                    order_id: result._id,
                    quantity: result.quantity,
                    total_price: result.total_price,
                    order_date: result.order_date,
                    customer_name: resp.data.result.customer_name, 
                    customer_email: resp.data.result.email,
                    customer_phone: resp.data.result.phone_number,
                    product: "",
                    product_id: "",
                };

                axios.get("http://localhost:5008/api/product/getProductById/"+result.product_id).then((resp1) => {

                    orderObject.product = resp1.data.result.product_name;
                    orderObject.product_id = resp1.data.result.product_id;

                    responseUtil.successResponse(res, messageUtil.successResponse, orderObject);
                });
            });
        } else {
            responseUtil.notFoundErrorResponse(res, messageUtil.notfoundError);
        }
    } catch(ex) {
        responseUtil.serverErrorResponse(res, ex);
    }
}