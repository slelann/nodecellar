
var TempoDBClient = require('tempodb').TempoDBClient;
var tempodb = new TempoDBClient('18b5f055f1af4bb69e60698ac5812ccf', '9e8380a60d384761a98b722eec55091d');

var outsideTemperatureSerieKey	= 'location:outside.temperature.1';
var outsideHumiditySerieKey		= 'location:outside.humidity.1';
var cellarTemperatureSerieKey	= 'location:cellar.temperature.1';
var cellarHumiditySerieKey		= 'location:cellar.humidity.1';

/** 
 * GET SERIES 
 */
function getSeries(request,cb) {
    console.log("Get series requested... ");
    var options={};
    if (request.query.key) {
		options = {key: request.query.key};
		console.log("key:"+request.query.key);
    }
    else if(request.query.tag) {
		options = {tag: [request.query.tag]};
		console.log("tag:"+request.query.tag);
    }
    else if(request.query.attribute) {
		var attrname=request.query.attribute.split(":")[0];
		var attrvalue=request.query.attribute.split(":")[1];
		var attrObject = {};
		attrObject[attrname]=attrvalue;
		options = {attr: attrObject };
		console.log("attr: "+attrname+":"+attrvalue);
    }
    
    tempodb.get_series(options,cb);

}

/**
 * GET SERIES DATA for date range and a key|attr|tag value
 * @param start date
 * @param end date
 * @param key
 * @param tag
 * @param attr
 */
function getSeriesData(request,cb) {
    console.log("Get series data requested... ");
    
    var series_start_date = request.query.start;
    var series_end_date = request.query.end;
    
    var options={};
    if (request.query.key) {
		options = {key: request.query.key};
		console.log("key:"+request.query.key);
    }
    else if(request.query.tag) {
		options = {tag: [request.query.tag]};
		console.log("tag:"+request.query.tag);
    }
    else if(request.query.attribute) {
		var attrname=request.query.attribute.split(":")[0];
		var attrvalue=request.query.attribute.split(":")[1];
		var attrObject = {};
		attrObject[attrname]=attrvalue;
		options = {attr: attrObject };
		console.log("attr: "+attrname+":"+attrvalue);
    }
    
    tempodb.read(series_start_date, series_end_date,options,cb);

}

/**
 * INSERT BULK DATA
 */

function insertSeriesData (ts, data) {
		
		console.log('insertSeriesData:'+ ts + '='+data);
						
		var cb = function(result){ console.log('Weather data insertion for ' + ts + ' : ' + result.body); };

		tempodb.write_bulk(ts,data,cb);
	
}


/**
 * DELETE DATA
 */

function deleteSerieData (series_key, series_start_date, series_end_date) {
		
		console.log('deleteSerieData:'+ series_key + ':'+series_start_date+'-'+series_end_date);
						
		var cb = function(result){ console.log('Weather data deletion : ' + result.body); };

		tempodb.delete_key(series_key, series_start_date, series_end_date,cb);
	
}


module.exports.getSeries = getSeries;
module.exports.getSeriesData = getSeriesData;
module.exports.insertSeriesData = insertSeriesData;
module.exports.deleteSerieData = deleteSerieData;

