var debug = require('debug')('router'),
    impl = require('implementjs'),
	restrict = require('../authent').restrict;

// Two dependencies, an Express HTTP server and a handler
module.exports = function (app, handler) {
    debug('setting up routes for forecastio...');

    // Validate handler's interface
    impl.implements(handler, {renderCurrentTemp: impl.F});
    //  Forecastio interface
    app.get('/weather', restrict, handler.renderCurrentTemp);
    
};