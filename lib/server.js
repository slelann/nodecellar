var debug = require('debug')('server'),
    express = require('express'),
	http = require('http'),
    app,
    server;

// Create the express app
debug('creating Express App...');
app = express();

// Apply the configuration
require('./config').apply(app);

//Create the http server
debug('creating http server...');
server = http.createServer(app);

// Export the server
module.exports = server;

