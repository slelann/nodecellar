var debug = require('debug')('handler');
var util = require('../util');

// Receive the database module as an injected dependency
module.exports = function(server, handler) {
	var loginRouter,
		tempodbRouter,
		forecastioRouter,
		uploadRouter;
	
	loginRouter      = require('./login')(server, handler);
	tempodbRouter    = require('./tempodb')(server, handler);
	forecastioRouter = require('./forecastio')(server, handler);
	uploadRouter     = require('./upload')(server, handler);
	
	return util.extend(loginRouter, tempodbRouter, forecastioRouter, uploadRouter);
};
