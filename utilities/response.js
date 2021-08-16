'use strict';

const config = require('./http-status');
const loggerUtil = require('./logger');
const messageUtil = require('./message');

// Success response
exports.successResponse = (res, message, result) => {
  const response = { 
    success: true,
    message: message
  };
  if (result) {
    response.result = result;
  }
  res.status(config.HTTP_STATUS_CODES.OK).send(response);
};

// Internal server failed
exports.serverErrorResponse = (res, error) => {
  loggerUtil.error({
    message: error.toString(),
    level: 'error'
  });
  res.status(config.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send({
    success: false,
    error: error.toString(),
    message: messageUtil.serverError
  });
};

// Validation Error
exports.validationErrorResponse = (res, errors, message) => {
  res.status(config.HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({
    success: false,
    errors: errors,
    message: message
  });
};

// Forbidden error
exports.forbiddenErrorResponse = (res, errors) => {
  res.status(config.HTTP_STATUS_CODES.FORBIDDEN).json({
    success: false,
    errors: errors,
    message: messageUtil.forbiddenError
  });
};

// Bad request error
exports.badRequestErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.BAD_REQUEST).send({
    success: false,
    message: message
  });
};

// Payment required
exports.paymentRequiredResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.BAD_REQUEST).send({
    success: false,
    message: message
  });
};

// document not found error
exports.notFoundErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.NOT_FOUND).send({
    success: false,
    message: message
  });
};

// Already exist document error
// exports.existDocumentResponse = (res, message) => {
//   res.status(config.HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).send({
//     success: false,
//     message: message
//   });
// };

// Already exist document error
exports.existDocumentResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.CONFLICT).send({
    success: false,
    message: message
  });
};

// Authorization error
exports.authorizationErrorResponse = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.UNAUTHORIZED).send({
    success: false,
    message: message
  });
};

// to many request
exports.rateLimitError = (res, message) => {
  res.status(config.HTTP_STATUS_CODES.TOO_MANY_REQUESTS).send({
    success: false,
    message: message
  });
};
