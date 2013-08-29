var debug = require('debug')('router'),
    impl = require('implementjs'),
	restrict = require('../authent').restrict;

// Two dependencies, an Express HTTP server and a handler
module.exports = function (app, handler) {
    debug('setting up routes for statsHandler...');

    // Validate handler's interface
    impl.implements(handler, {renderStats: impl.F});
    //  Stats interface
    app.get('/stats', restrict, handler.renderStats);
    
};