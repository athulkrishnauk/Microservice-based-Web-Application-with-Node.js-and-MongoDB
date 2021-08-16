//  Database and server configuartion 
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: { 
        root: rootPath,
        app: {
            name: 'productAppDb'
        },
        port: 5008,
        db: 'mongodb://localhost/productAppDb',
            
    }
};

module.exports = config[env];