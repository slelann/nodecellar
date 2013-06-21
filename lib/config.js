var debug = require('debug')('config'),
    flash = require('connect-flash'),
    path = require('path'),
    express = require('express'),
    server;

module.exports.apply = function(app) {
	var rootDir = path.resolve(__dirname, '..');
    
    
    app.configure(function () {
        debug('setting up common configuration...');
        
        // Configure jade as template engine
        app.set('views', rootDir + '/views');
        app.set('view engine', 'jade');
        app.set("view options", {layout: false});
        
        // Parse the body
        app.use(express.bodyParser());
        
        // Use the method override so that PUT and DELETE can be simulated with a POST
        app.use(express.methodOverride());
        
        // Parse the cookies
        app.use(express.cookieParser());
        
        // Session support, in normal use, put secret in environment var:
        // app.use(express.session({ secret: process.env.MY_SESSION_SECRET }));
        app.use(express.session({ secret: 'hypermegatop really!' }));
        app.use(flash());
        
		app.use(function(req, res, next){
			var err = req.session.error,
				msg = req.session.success;
			delete req.session.error;
			delete req.session.success;
			res.locals.message = '';
			if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
			if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
			next();
		});

        // Enable the router
        app.use(app.router);
        
        // Serve static content from "public" directory
        app.use(express.static(rootDir + '/public'));
        
    });
    
    app.configure('dev', function () {
        debug('setting up "dev" configuration...');
        app.use(express.logger('tiny'));
        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });
    
    app.configure('production', function () {
        debug('setting up "production" configuration...');
        app.use(express.errorHandler());
    });
};

