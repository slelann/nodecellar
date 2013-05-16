var debug = require('debug')('router'),
    impl = require('implementjs');

// Two dependencies, an Express HTTP server and a handler
module.exports = function (server, handler) {
    debug('setting up routes for forecastio...');

    // Validate handler's interface
    impl.implements(handler, {renderCurrentTemp: impl.F});
    //  Forecastio interface
    server.get('/weather', handler.renderCurrentTemp);
    
};