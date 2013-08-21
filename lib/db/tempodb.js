
var TempoDBClient = require('tempodb').TempoDBClient;
var tempodb = new TempoDBClient('18b5f055f1af4bb69e60698ac5812ccf', '9e8380a60d384761a98b722eec55091d');


var serieTempExt = {key: 'location:outside.temperature.1',name: 'Temperature exterieure'};
var serieTempCave = {key: 'location:cellar.temperature.1',name: 'Temperature cave'};
var serieHumExt = {key: 'location:outside.humidity.1',name: 'Humidite exterieure'};
var serieHumCave = {key: 'location:cellar.humidity.1',name: 'Humidite cave'};
var series_keys = ['location:outside.temperature.1','location:cellar.temperature.1','location:outside.humidity.1','location:cellar.humidity.1'];
var series = [];
series.push(serieTempExt);
series.push(serieTempCave);
series.push(serieHumExt);
series.push(serieHumCave);

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
function getSeriesData(series_start_date, series_end_date, keys, tags, attributes, options, cb) {
    console.log("Get series data requested... ");
        
    if (keys) {
		options['key']=keys;
		console.log("key:"+keys);
    }
    else if(tags) {
		options['tag']= [tags];
		console.log("tag:"+tags);
    }
    else if(attributes) {
		var attrname=attributes.split(":")[0];
		var attrvalue=attributes.split(":")[1];
		var attrObject = {};
		attrObject[attrname]=attrvalue;
		options['attr']=attrObject;
		console.log("attr: "+attrname+":"+attrvalue);
    }
    //options['interval']="6hour";
    
    console.log("dates:"+series_start_date + " - " + series_end_date);
    tempodb.read(series_start_date, series_end_date,options,cb);

}

/**
 * INSERT BULK DATA
 */

function insertSeriesData (keys,values,cb) {
		
		console.log('::insertSeriesData:');
						
		if(keys && values) {
			var tempoData = [];
			for (var i = 0; i < keys.length; i++) {
				tempoData.push({key:keys[i], v: JSON.parse(values[i])});
			}
			console.log("data:"+JSON.stringify(tempoData));
			
			tempodb.write_bulk(new Date(),tempoData,cb);
		}
		else {
			console.log('::insertSeriesData: problème de données');
		}
	
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
module.exports.series = series;
module.exports.series_keys = series_keys;


