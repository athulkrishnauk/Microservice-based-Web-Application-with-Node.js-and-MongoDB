//  Database and server configuartion 
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: { 
        root: rootPath,
        app: {
            name: 'customerAppDb'
        },
        port: 5006,
        db: 'mongodb://localhost/customerAppDb',
            
    }
};

module.exports = config[env];