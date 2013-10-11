// -- Module dependencies.
var debug = require('debug')('app'),
	express = require('express'),
    http = require('http'),
	mongoose = require('mongoose'),
	mongolabdb;

// -- Create Express instance and export
var app = module.exports = express();

// -- Apply Config
require('./lib/config').apply(app);

var db, handler;

// Bootstrap db connection
var uristring = process.env.MONGOLAB_URI || 'mongodb://slelann:satanas@ds041218.mongolab.com:41218/heroku_app15653280';
// Bootstrap db connection
mongoose.connect(uristring);
mongolabdb = mongoose.connection;
//Events management
mongolabdb.on('error', function (err) {
	debug('connection error:' + err);
});
mongolabdb.on('close', function () {
	debug('connection closed');
});
mongolabdb.once('open', function (callback) {
	debug('Connected to mongolab db...');

	require('./lib/model/wines');

	//DB
	db = require('./lib/db')(mongoose);
	//Handler
	handler = require('./lib/handler/index')(db);
	// -- Routes
	require('./lib/router/index')(app, handler);

});



http.createServer(app).listen(process.env.PORT, function(){
	debug("Express server listening on port %d in %s mode", process.env.PORT, process.env.NODE_ENV);
	//debug("env = "+ util.inspect(process.env));
});


