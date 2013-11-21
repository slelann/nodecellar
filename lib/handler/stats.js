var debug = require('debug')('handler');
var util  = require('util');

debug('stats');

function mapObjToArray(in_arr) {
	return [in_arr._id,in_arr.y];
}

function objToArray(myobj, prop) {
	var arr = [];
	for (var i in myobj) {
		arr.push(myobj[i][prop]);
	}
	return arr;
}

function returnProp(element){
	return element._prop;
}

function isArray(object)
{
	if (object.constructor === Array) return true;
	else return false;
}

function extractPropFromArray(myobj, _prop) {
	myobj.map(returnProp);
}
module.exports = function(db) {
	var handler = {};

	handler.renderStats  = function (req, res) {
		debug('renderStats');
		res.render('stats',{title: "My cellar stats"});
    };

	handler.renderCountryStats  = function (req, res) {
			debug('renderCountryStats');
			db.getWinesByCountry(function(results) {
				var countryStats = results.data.map(mapObjToArray);
				res.send({'countryStats': countryStats});
			});
    };

	handler.renderTypeStats  = function (req, res) {
			debug('renderCountryStats');
			db.getWinesByType(function(results) {
				res.send({'typeStats': results.data.map(mapObjToArray)});
			});
    };

	handler.renderVintageStats  = function (req, res) {
			debug('renderVintageStats');
			db.getWinesByVintage(function(results) {
				var vintageStats = objToArray(results.data,'y');
				var vintageNames = objToArray(results.data,'_id');
				res.send({'vintagesStats': vintageStats, 'vintages': vintageNames});
			});
    };

	return handler;

};
