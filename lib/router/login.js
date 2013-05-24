var debug = require('debug')('router'),
    impl = require('implementjs'),
    passport = require('passport');

// Two dependencies, an Express HTTP server and a handler
module.exports = function (server, handler) {
    debug('setting up routes for passport...');

    // Validate handler's interface
    impl.implements(handler, {renderIndex: impl.F});
    impl.implements(handler, {renderLogin: impl.F});
    impl.implements(handler, {renderLogout: impl.F});
    impl.implements(handler, {ensureAuthenticated: impl.F});
    
    server.get('/', handler.renderIndex);
    server.get('/login', handler.renderLogin);
    server.get('/logout', handler.renderLogout);
    
	server.post('/login', handler.ensureAuthenticated);  
	
};
