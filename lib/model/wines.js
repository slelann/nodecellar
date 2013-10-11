var debug = require('debug')('db');
var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;

debug('init schema');

/**
 * Wine Schema
 */

var WineSchema = new Schema({
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


/**
 * Validations
 */



/**
 * Methods
 */
//WineSchema.methods = {};

/**
 * Statics
 */

WineSchema.statics = {

	/**
	* List articles
	*
	* @param {Object} options
	* @param {Function} cb
	* @api private
	*/

	list: function (options, cb) {
		var criteria = options.criteria || {};

		this.find(criteria)
			.populate('designation', 'Harmonie')
			.sort({'vineyard': -1}) // sort
			.limit(options.perPage)
			.skip(options.perPage * options.page)
			.exec(cb);
	}
};

// Persist model
mongoose.model('Wine', WineSchema);

