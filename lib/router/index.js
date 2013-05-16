var debug = require('debug')('handler');
var util = require('../util');

// Receive the database module as an injected dependency
module.exports = function(server, handler) {
	var tempodbRouter,
		forecastioRouter;
	
	tempodbRouter = require('./tempodb')(server, handler);
	forecastioRouter = require('./forecastio')(server, handler);
	
	return util.extend(tempodbRouter, forecastioRouter);
};
