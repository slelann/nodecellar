var util = require('../util');

// Receive the mongoose connection as an injected dependency
module.exports = function(mongoose) {

	var forecastio = require('./forecastio'),
		tempodb = require('./tempodb'),
		mongodb = require('./mongodb')(mongoose);
		//cellartracker = require('./cellartracker')(mongoose);

	return util.extend(forecastio, tempodb, mongodb);
};