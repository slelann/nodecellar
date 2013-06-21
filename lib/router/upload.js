var debug = require('debug')('router'),
    impl = require('implementjs'),
	restrict = require('../authent').restrict;
    

// Two dependencies, an Express HTTP server and a handler
module.exports = function (app, handler) {
    debug('setting up routes for upload...');

    // Validate handler's interface
    impl.implements(handler, {displayUploadForm: impl.F});
    impl.implements(handler, {upload: impl.F});
    
    app.get('/csv', restrict, handler.displayUploadForm);
    app.post('/upload', restrict, handler.upload);
    
};
