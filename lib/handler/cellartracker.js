var debug = require('debug')('handler');
var util = require("util");

module.exports = function(db) {
	var handler = {};

	handler.renderCellarTrackerData = function (req, res) {
		debug('renderCellarTrackerData');
		res.send({title: 'titre'})		;
			db.getCellarTrackerData(function(result) {
				res.send(JSON.stringify(result.body,null,'\t'));
			});
     };

	return handler;
};
