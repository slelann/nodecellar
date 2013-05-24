var debug = require('debug')('handler'),
	passport = require('passport');

module.exports = function(db) {

	var handler = {};
  
	handler.renderIndex = function (req, res) {
             res.render('index', {title: "Express Boilerplate"});
         };

	handler.renderLogin = function (req, res) {
			debug("handler.renderLogin");
			res.render('login', { user: req.user, message: req.flash('error') });
         };

	handler.renderLogout = function (req, res) {
			debug("handler.renderLogout");
			req.logout();
			res.redirect('/');
         };
         
    // Simple route middleware to ensure user is authenticated.
	// Use this route middleware on any resource that needs to be protected. If
	// the request is authenticated (typically via a persistent login session),
	// the request will proceed. Otherwise, the user will be redirected to the
	// login page.
	handler.ensureAuthenticated = function (req, res, next) {
		debug("handler.ensureAuthenticated");
		passport.authenticate('local', function(req, res) {
			res.redirect('/');
		});
		};
	

  return handler;
};