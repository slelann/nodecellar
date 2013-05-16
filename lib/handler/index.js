var debug = require('debug')('handler');
var util = require('../util');

// Receive the database module as an injected dependency
module.exports = function(db) {
	var tempodbHandler,
		forecastioHandler;
	
	tempodbHandler = require('./tempodb')(db);
	forecastioHandler = require('./forecastio')(db);
	
	return util.extend(tempodbHandler, forecastioHandler);
};
