var rickshaw = require("rickshaw");
var debug = require('debug')('handler');
var util = require("util");

function transformData(input) {
	var output = [];
	input.forEach(function(element) {
		var object = {};
		object['x'] = new Date(element.t).getTime() / 1000;
		object['y'] = element.v;
		output.push(object);
	});
	return output;
}

function normalizeSeriesLength(unnormalizeddata) {
	var minlen = 0,
		maxlen = 0;
	///Calculate min/max length
	unnormalizeddata.forEach(function(serie) {
		if(serie.data.length) {
			if(serie.data.length > maxlen) maxlen=serie.data.length;
			if(serie.data.length < minlen || minlen===0) minlen=serie.data.length;
		}
	});

	if(minlen===maxlen) return unnormalizeddata;

	//Normalize
	unnormalizeddata.forEach(function(serie) {
		if(serie.data.length === minlen) {
			var lastpoint = serie.data[minlen-1];
			debug('lastpoint:'+JSON.stringify(lastpoint));
			for (var i = minlen; i < maxlen; i++) {
				serie.data.push(lastpoint);
			}
		}
	});
	return unnormalizeddata;
}

module.exports = function(db) {
	var handler = {};

	function mapSerieKeyName(instrkey) {
		var serieName;
		db.tempodb.series.forEach(function(serie) {
			if(serie.key == instrkey) serieName = serie.name;
		});
		return serieName;
	}

	handler.renderSeries = function (req, res) {
			db.tempodb.getSeries(req,function(result) {
			res.send(JSON.stringify(result.body,null,'\t'));
		});
     };

	handler.renderSeriesData = function (req, res) {
			var series_start_date = req.query.start;
			var series_end_date = req.query.end;
			var keys = req.query.key;
			var tags = req.query.tag;
			var attributes = req.query.attribute;

			db.tempodb.getSeriesData(series_start_date, series_end_date, keys, tags, attributes,function(result) {
				res.send(JSON.stringify(result.body,null,'\t'));
			});
     };

	handler.renderChart = function (req, res) {
			debug('renderChart');
			res.render('chart', {title: "Chart"});
     };


	handler.chartData = function (req, res) {

			debug('chartData');
			var series_data = [];
			var series_start_date = new Date(req.query.fromdate);
			var series_end_date = new Date(req.query.todate);
			var options = {};
			if(req.query.function) options['function']=req.query.function;
			if(req.query.interval) options['interval']=req.query.interval;

			var palette = new rickshaw.Color.Palette();
			// Get tempo DB data
			db.tempodb.getSeriesData(series_start_date, series_end_date, db.tempodb.series_keys, null, null, options, function (result) {

				result.body.forEach(function(element) {

					debug('	data:' + element.series.key + ':'+element.data.length);

					if(element.data.length > 0) {
						series_data.push(
						{
							color: palette.color(),
							name: mapSerieKeyName(element.series.key),
							data: transformData(element.data)
						});
					}
				});

			//Normalize series data length and send result
			res.send(normalizeSeriesLength(series_data));

			});


			//Requete les 4 series et concatener
			// series/data?key=location:outside.humidity.1&key=location:outside.temperature.1
			//             &start=2013-05-15T22%3A00%3A00.000Z&end=2013-06-04T21%3A59%3A59.000Z
			//key=>name, data(t,v)=>data(x,y), +color,
			//
			// [ { "series": { "id": "748a6f74029b471fac5568452a8d7f0b", "key": "location:outside.humidity.1",
			//	   "name": "", "tags": [ "humidity" ], "attributes": { "location": "outside" } },
			//	   "start": "2013-05-15T22:00:00.000Z", "end": "2013-06-04T21:59:59.000Z",
			//	   "data": [ { "t": "2013-05-16T13:00:00.000Z", "v": 51.4 }, { "t": "2013-05-16T14:00:00.000Z", "v": 49 }, { "t": "2013-05-16T15:00:00.000Z", "v": 66 }, { "t": "2013-05-16T16:00:00.000Z", "v": 63 }, { "t": "2013-05-16T17:00:00.000Z", "v": 61 }, { "t": "2013-05-16T18:00:00.000Z", "v": 64 }, { "t": "2013-05-16T19:00:00.000Z", "v": 80 },....

     };

	handler.insertSeriesData = function (req, res) {

			// POST series/data?key=location:cellar.humidity.1&key=location:cellar.temperature.1&value=82&value=20
			//
			// curl -v --data "username=slelann&password=siol...." --cookie-jar cookies.txt https://c9.io/auth/login
			// curl --cookie cookies.txt --cookie-jar cookies.txt --dump-header headers.txt https://c9.io/dashboard.html
			// curl -v --cookie cookies.txt --cookie-jar cookies.txt -d "seriekey=location:cellar.humidity.1&seriekey=location:cellar.temperature.1&value=82&value=20" http://nodecellar.slelann.c9.io/series/data

			debug('::insertSeriesData:'+util.inspect(req));
			var keys = req.body.key;
			var values = req.body.value;
			debug('keys'+keys.length+':'+keys);
			debug('values'+values.length+':'+values);

			db.tempodb.insertSeriesData(keys, values, function(result) {
				res.send(JSON.stringify(result.body,null,'\t'));
			});
     };

	return handler;
};