var debug = require('debug')('router'),
    impl = require('implementjs'),
	restrict = require('../authent').restrict;

// Two dependencies, an Express HTTP server and a handler
module.exports = function (app, handler) {
    debug('setting up routes for statsHandler...');

    // Validate handler's interface
    impl.implements(handler, {renderStats: impl.F});
    impl.implements(handler, {renderCountryStats: impl.F});
    impl.implements(handler, {renderTypeStats: impl.F});
    impl.implements(handler, {renderVintageStats: impl.F});
    //  Stats interface
    app.get('/stats', restrict, handler.renderStats);
    app.get('/stats/country', restrict, handler.renderCountryStats);
    app.get('/stats/type', restrict, handler.renderTypeStats);
    app.get('/stats/vintage', restrict, handler.renderVintageStats);
};