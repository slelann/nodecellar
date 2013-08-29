var debug = require('debug')('db');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var mongolabdb;
var WineSchema;
var util = require("util");

var uristring = process.env.MONGOLAB_URI || 'mongodb://slelann:satanas@ds041218.mongolab.com:41218/heroku_app15653280';
// Bootstrap db connection
mongoose.connect(uristring);
mongolabdb = mongoose.connection;
//Events management
mongolabdb.on('error', function (err) {
	debug('connection error:' + err);
});
mongolabdb.on('close', function () {
	debug('connection closed');
});
mongolabdb.once('open', function (callback) {
	console.log('Connected to mongolab db...');
	initSchema();
	//mongolabdb.close();
});


/**
 * Init Wine Schema
 */

function initSchema() {

	WineSchema = new Schema({
		iWine: {type : String, default : '', trim : true},
		quantity: {type : Number, default : 0, trim : true},
		location: {type : String, default : '', trim : true},
		bin: {type : String, default : '', trim : true},
		size: {type : String, default : '', trim : true},
		price: {type : Number, default : 0, trim : true},
		vintage: {type : String, default : '', trim : true},
		wine: {type : String, default : '', trim : true},
		locale: {type : String, default : '', trim : true},
		country: {type : String, default : '', trim : true},
		region: {type : String, default : '', trim : true},
		subRegion: {type : String, default : '', trim : true},
		appellation: {type : String, default : '', trim : true},
		producer: {type : String, default : '', trim : true},
		sortProducer: {type : String, default : '', trim : true},
		type: {type : String, default : '', trim : true},
		varietal: {type : String, default : '', trim : true},
		masterVarietal: {type : String, default : '', trim : true},
		designation: {type : String, default : '', trim : true},
		vineyard: {type : String, default : '', trim : true},
		ctNote: {type : Number, default : 0, trim : true},
		beginConsume: {type : String, trim : true},
		endConsume: {type : String, trim : true},
		createdAt  : {type : Date, default : Date.now}
		});

	mongoose.model('Wine', WineSchema);
}

function saveWine(ctwine) {
	console.log('saveWine');
	var Wine = mongoose.model('Wine');
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
	
}

module.exports.saveWine = saveWine;
