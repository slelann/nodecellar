var debug = require('debug')('handler');
var util = require('../util');

debug('Handler settings');

// Receive the database module as an injected dependency
module.exports = function(db) {
	var loginHandler,
		tempodbHandler,
		forecastioHandler,
		uploadHandler,
		statsHandler;

	loginHandler = require('./login')(db);
	tempodbHandler = require('./tempodb')(db);
	forecastioHandler = require('./forecastio')(db);
	uploadHandler = require('./upload')(db);
	statsHandler = require('./stats')(db);

	return util.extend(loginHandler, tempodbHandler, forecastioHandler, uploadHandler, statsHandler);
};
