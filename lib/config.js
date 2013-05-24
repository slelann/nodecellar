var debug = require('debug')('config'),
    path = require('path'),
    express = require('express'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var users = [{ id: 1, username: 'slelann', password: 'satanas', email: 'bob@example.com' }];

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object. In the real world, this would query a database;
// however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username. If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message. Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

// Export nothing, only extend express' HTTPServer with an "applyConfiguration" method
// (extend HTTPSServer if https is used). Will NOT work with Express 3.0.
express.HTTPServer.prototype.applyConfiguration = function () {
    var self = this,
    rootDir = path.resolve(__dirname, '..');
    
    this.configure(function () {
        debug('setting up common configuration...');
        
        // Configure jade as template engine
        self.set('views', rootDir + '/views');
        self.set('view engine', 'jade');
        self.set("view options", {layout: false});
        
        // Parse the body
        self.use(express.bodyParser());
        
        // Use the method override so that PUT and DELETE can be simulated with a POST
        self.use(express.methodOverride());
        
        // Parse the cookies
        self.use(express.cookieParser());
        
        // Session support, in normal use, put secret in environment var:
        // self.use(express.session({ secret: process.env.MY_SESSION_SECRET }));
        self.use(express.session({ secret: 'hypermegatop really!' }));
        self.use(passport.initialize());
        // Enable the router
        self.use(self.router);
        
        // Serve static content from "public" directory
        self.use(express.static(rootDir + '/public'));
    });
    
    this.configure('dev', function () {
        debug('setting up "dev" configuration...');
        self.use(express.logger('tiny'));
        self.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    });
    
    this.configure('production', function () {
        debug('setting up "production" configuration...');
        self.use(express.errorHandler());
    });
};

