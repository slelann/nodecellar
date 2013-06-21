var debug = require('debug')('router'),
    impl = require('implementjs'),
	restrict = require('../authent').restrict;
    
// Two dependencies, an Express HTTP app and a handler
module.exports = function (app, handler) {

    // Validate handler's interface
    impl.implements(handler, {renderIndex: impl.F});
    impl.implements(handler, {renderLogin: impl.F});
    impl.implements(handler, {renderLogout: impl.F});
    impl.implements(handler, {ensureAuthenticated: impl.F});
    
    app.get('/', restrict, handler.renderIndex);
    app.get('/login', handler.renderLogin);
    app.get('/logout', restrict, handler.renderLogout);
    
	app.post('/login', handler.ensureAuthenticated);  

};
