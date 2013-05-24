var debug = require('debug')('router'),
    impl = require('implementjs');

// Two dependencies, an Express HTTP server and a handler
module.exports = function (server, handler) {
    debug('setting up routes for upload...');

    // Validate handler's interface
    impl.implements(handler, {displayUploadForm: impl.F});
    impl.implements(handler, {upload: impl.F});
    
    server.get('/csv', handler.displayUploadForm);
    server.post('/upload', handler.upload);
    
};
