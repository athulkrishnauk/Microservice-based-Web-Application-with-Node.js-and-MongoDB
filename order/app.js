// Read node module files
require('dotenv').config();
const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    helmet = require("helmet"),
    morgan = require("morgan"),
    cookieParser = require("cookie-parser");
	axios = require('axios');
 
// database connectivity file path require    
require('./config/database');
 
// routers file path require
const routes = require("./routers");   

// server side valiadtion npm package require
const Joi = require("joi");
Joi.mongoId = require("joi-objectid")(Joi);

app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("combined", { stream: loggerUtil.stream }));
app.use(cookieParser());
app.use(routes);
mongoose.set('useFindAndModify', false);

// call
app.get('/', function(req, res) {
    res.send("Welcome");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		success: false,
		error: error.status || 500,
		message: error.message || 'Internal Server Error',
	});
});

module.exports = app;