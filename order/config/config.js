//  Database and server configuartion 
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: { 
        root: rootPath,
        app: {
            name: 'orderAppDb'
        },
        port: 5007,
        db: 'mongodb://localhost/orderAppDb',
            
    }
};

module.exports = config[env];