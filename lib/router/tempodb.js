var debug = require('debug')('router'),
    impl = require('implementjs');

// Two dependencies, an Express HTTP server and a handler
module.exports = function (server, handler) {
    debug('setting up routes for tempodb...');

    // Validate handler's interface
    impl.implements(handler, {renderIndex: impl.F});
    impl.implements(handler, {renderSeries: impl.F});
    
    server.get('/', handler.renderIndex);
    //Tempodb interface
    server.get('/series', handler.renderSeries);
    
};
