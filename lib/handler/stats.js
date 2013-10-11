var debug = require('debug')('handler');
var util  = require('util');

debug('stats');

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
			//var typeStats, vintageStats;
/*			db.getWinesByCountry(function(results) {
				var countriesStats = objToArray(results.data,'sum');
				var countriesNames = objToArray(results.data,'_id');
				res.render('stats', {title: "My cellar stats", countriesStats: countriesStats, countries: countriesNames});
			});
*/
         };

	handler.renderCountryStats  = function (req, res) {
			debug('renderCountryStats');
			db.getWinesByCountry(function(results) {
				var countriesStats = objToArray(results.data,'sum');
				var countriesNames = objToArray(results.data,'_id');
				res.write({'countriesStats': countriesStats, 'countries': countriesNames});
			});

    };
	handler.renderTypeStats  = function (req, res) {
			debug('renderCountryStats');
			db.getWinesByCountry(function(results) {
				var countriesStats = objToArray(results.data,'sum');
				var countriesNames = objToArray(results.data,'_id');
				res.write({'countriesStats': countriesStats, 'countries': countriesNames});
			});

    };
	handler.renderVintageStats  = function (req, res) {
			debug('renderCountryStats');
			db.getWinesByCountry(function(results) {
				var countriesStats = objToArray(results.data,'sum');
				var countriesNames = objToArray(results.data,'_id');
				res.write({'countriesStats': countriesStats, 'countries': countriesNames});
			});

    };
  return handler;

};
