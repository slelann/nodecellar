var debug = require('debug')('db');
var util = require("util");

debug('mongodb');

module.exports = function(mongoose) {

	var mongodb = {};

	var Wine = mongoose.model('Wine');

	mongodb.saveWine = function(ctwine) {
		console.log('saveWine');
		var options = { upsert: true };
		var update = {  iWine: ctwine.iWine,
						quantity: ctwine.Quantity,
						location: ctwine.Location,
						bin: ctwine.Bin,
						size: ctwine.Size,
						price: ctwine.Price,
						vintage: ctwine.Vintage,
						wine: ctwine.Wine,
						locale: ctwine.Locale,
						country: ctwine.Country,
						region: ctwine.Region,
						subRegion: ctwine.SubRegion,
						appellation: ctwine.Appellation,
						producer: ctwine.Producer,
						type: ctwine.Type,
						varietal: ctwine.Varietal,
						masterVarietal: ctwine.MasterVarietal,
						designation: ctwine.Designation,
						vineyard: ctwine.Vineyard,
						beginConsume: ctwine.BeginConsume,
						endConsume: ctwine.EndConsume,
						ctNote: ctwine.CT
						};

		Wine.findOneAndUpdate({ iWine: ctwine.iWine }, update, options, function (err, wine) {
			wine.save(function (err) {
				if (err) {
					console.log('error:'+err);
					console.log(util.inspect(ctwine));
				}
			});
		});

	};

	mongodb.getWinesByCountry = function(callback) {
		debug("--getWinesByCountry");

		// Wine.find(
		//         {},
		//         function(err, docs) {
		//         if (!err){
		//           console.log(docs);
		//           process.exit();
		//                   }
		//         else { throw err;}

		//         }
		// );

		Wine.aggregate([
			{ $group: {
			_id: '$country',
			y: { $sum: '$quantity'}
			}}, {$sort: {_id:1}}
		], function (err, results) {
			if (err) {
				console.error(err);
			} else {
				debug("countries:"+JSON.stringify(results));
				if (typeof callback != 'undefined') {
					callback({
						data: results
					});
				}
			}
		});
		return undefined;

	};

	mongodb.getWinesByType = function(callback) {
		debug("--getWinesByType");
		Wine.aggregate([
			{ $group: {
			_id: '$type',
			y: { $sum: '$quantity'}
			}}, {$sort: {_id:1}}
			], function (err, results) {
				if (err) {
					console.error(err);
				} else {
				if (typeof callback != 'undefined') {
					debug(JSON.stringify(results));
					callback({
						data: results
					});
				}
			}
		});
		return undefined;
	};

	mongodb.getWinesByVintage = function(callback) {
		debug("--getWinesByVintage");
		Wine.aggregate([
			{ $group: {
				_id: '$vintage',
				y: { $sum: '$quantity'}
		}}, {$sort: {_id:1}}
		], function (err, results) {
			if (err) {
				console.error(err);
			} else {
				if (typeof callback != 'undefined') {
					debug(JSON.stringify(results));
					callback({
						data: results
					});
				}
			}
		});
		return undefined;

	};

	return mongodb;
};

