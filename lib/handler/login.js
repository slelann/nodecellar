var debug = require('debug')('handler'),
	authenticate = require('../authent').authenticate;

module.exports = function(db) {
	
	var handler = {};

	handler.renderIndex = function (req, res) {
             res.render('index', {title: "My cellar conditions"});
         };

	handler.renderLogin = function (req, res) {
			debug("handler.renderLogin");
			res.render('login', { title: "Login", user: req.user });
         };

	handler.renderLogout = function (req, res) {
			debug("handler.renderLogout");
			req.session.destroy(function(){
				res.redirect('/login');
			});
         };
         
	handler.ensureAuthenticated = function (req, res) {
		debug("handler.ensureAuthenticated");
		authenticate(req.body.username, req.body.password, function(err, user){
			if (user) {
				debug("Authentication success");
				
				// Regenerate session when signing in
				// to prevent fixation
				req.session.regenerate(function(){
					// Store the user's primary key
					// in the session store to be retrieved,
					// or in this case the entire user object
					req.session.user = user;
					req.session.success = 'Authenticated as ' + user.name
					+ ' click to <a href="/logout">logout</a>. '
					+ ' You may now access <a href="/restricted">/restricted</a>.';
					res.redirect('/');
				});
				} else {
					debug("Authentication failed, please check your");
					req.session.error = 'Authentication failed, please check your '
					+ ' username and password.'
					+ ' (use "tj" and "foobar")';
					res.redirect('/login');
				}
			});
		};
	
  return handler;
};