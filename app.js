// -- Module dependencies.
var debug = require('debug')('app'),
	express = require('express'),
    http = require('http'), util = require("util"),
    db = require('./lib/db');

// -- Create Express instance and export
var app = module.exports = express();
    
// -- Apply Config
require('./lib/config').apply(app);

//Handler
var handler = require('./lib/handler/index')(db);

// -- Routes
require('./lib/router/index')(app, handler);

http.createServer(app).listen(process.env.PORT, function(){
	debug("Express server listening on port %d in %s mode", process.env.PORT, process.env.NODE_ENV);
	debug("env = "+ util.inspect(process.env));
});

