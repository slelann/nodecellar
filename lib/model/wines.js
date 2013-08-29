var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;


// /**
//  * Getters
//  */

// var getTags = function (tags) {
// 	return tags.join(',');
// };

// /**
//  * Setters
//  */

// var setTags = function (tags) {
// 	return tags.split(',');
// };

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
	beginConsume: {type : Number, trim : true},
	endConsume: {type : Number, trim : true},
	createdAt  : {type : Date, default : Date.now}
	});

/**
 * Validations
 */

// WineSchema.path('title').validate(function (title) {
// 	return title.length > 0;
// }, 'Article title cannot be blank');

// WineSchema.path('body').validate(function (body) {
// 	return body.length > 0;
// }, 'Article body cannot be blank');


/**
 * Methods
 */
//WineSchema.methods = {};

/**
 * Statics
 */

//WineSchema.statics = {};

mongoose.model('Wine', WineSchema);

