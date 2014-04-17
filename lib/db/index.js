var util = require('../util');

// Receive the mongoose connection as an injected dependency
module.exports = function(mongoose) {

	var forecastio = require('./forecastio'),
		mongodb = require('./mongodb')(mongoose),
		tempodb = require('./tempodb'),
		cellartracker = require('./cellartracker');

	return util.extend(forecastio, tempodb, cellartracker, mongodb);
};