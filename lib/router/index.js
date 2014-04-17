var debug = require('debug')('handler');
var util = require('../util');

// Receive the database module as an injected dependency
module.exports = function(app, handler) {
	var loginRouter,
		tempodbRouter,
		forecastioRouter,
		uploadRouter,
		cellarTrackerRouter,
		statsRouter;

	loginRouter      = require('./login')(app, handler);
	tempodbRouter    = require('./tempodb')(app, handler);
	forecastioRouter = require('./forecastio')(app, handler);
	uploadRouter     = require('./upload')(app, handler);
	statsRouter      = require('./stats')(app, handler);
	cellarTrackerRouter = require('./cellartracker')(app, handler);

	return util.extend(loginRouter, tempodbRouter, forecastioRouter, uploadRouter, statsRouter,cellarTrackerRouter);
};
