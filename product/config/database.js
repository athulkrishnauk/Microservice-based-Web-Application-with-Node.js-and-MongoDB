const mongoose = require('mongoose');
    config = require('./config'),
    http = require('http'),
    loggerUtil = require("../../utilities/logger");

// Database connectivity
mongoose.connect(config.db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});
var db = mongoose.connection;
db.on("error", (err) =>
  loggerUtil.error({
    message: `MongoDB connection error - ${err.toString()}`,
    level: "error",
  })
);

db.once('open', function(callback) {
    var server = http.Server(app);
    server.listen(config.port, function() {
      loggerUtil.log({
        message: "MongoDB connected",
        level: "info",
      })
      console.log("Server started at port " + config.port)
    });
});

