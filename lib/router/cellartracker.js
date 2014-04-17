var debug = require('debug')('router'),
    impl = require('implementjs'),
	restrict = require('../authent').restrict;

// Two dependencies, an Express HTTP app and a handler
module.exports = function (app, handler) {
    debug('setting up routes for cellar tracker...');

    // Validate handler's interface
    impl.implements(handler, {renderCellarTrackerData: impl.F});

    //Tempodb interface
    app.get('/cellartracker', restrict, handler.renderCellarTrackerData);
};
