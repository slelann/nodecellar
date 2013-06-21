var debug = require('debug')('authent'),
	hash = require('./pass').hash;

var users = [ { id: '0', name: 'slelann', password:'satanas' }];

users.forEach(function(user) {
	hash(user.password, function(err, salt, hash){
		if (err) throw err;
		// store the salt & hash in the "db"
		user.salt = salt;
		user.hash = hash;
	});
});

function findByUsername(username, fn) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.name === username) {
			debug("username found");
			return fn(null, user);
		}
	}
	return fn(null, null);
}

exports.restrict= function (req, res, next) {
	if (req.session.user) {
		next();
	} else {
		req.session.error = 'Access denied!';
		res.redirect('/login');
	}
};
	
// Authenticate using our plain-object database

exports.authenticate = function (name, pass, fn) {
	findByUsername(name, function(err, user) {
		// query the db for the given username
		if (!user) return fn(new Error('cannot find user'));
			// apply the same algorithm to the POSTed password, applying
			// the hash against the pass / salt, if there is a match we
			// found the user
			hash(pass, user.salt, function(err, hash){
		if (err) return fn(err);
		if (hash == user.hash) return fn(null, user);
			fn(new Error('invalid password'));
		});
	});
};
	
