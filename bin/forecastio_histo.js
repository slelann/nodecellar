#! /app/bin/node
var Forecast = require('forecast.io');
var debug = require('debug')('forecast.io');
var util= require('util');
var moment = require('moment');
var TempoDBClient = require('tempodb').TempoDBClient;
var tempodb = new TempoDBClient('18b5f055f1af4bb69e60698ac5812ccf', '9e8380a60d384761a98b722eec55091d');


/**
 * get Forecast.io current weather data
 */
function getWeather() {
	
	//  APIKey: process.env.FORECAST_API_KEY
	var key = {
		APIKey:  "756a4a008fed90be13cd417dd4a3f60e",
		exclude: "minutely,hourly,daily,flags,alerts",
		units:   "si"
	};
	var forecast = new Forecast(key);
	
	// Coordonnees de Chevaigne
	var latitude  = "48.2097";
	var longitude = "-1.6298";
	
	var options = {
		units:   "si",
		exclude: "currently,minutely,daily,flags,alerts"
	};
	
	var enddate = moment('2013-05-17');	
	debug('start getweather');
	
	var currentdate = moment('2013-05-16');
	while (currentdate < enddate) {
		forecast.getAtTime(latitude, longitude, currentdate.unix(), options, insertWeatherData);
		currentdate.add('days',1);
	}
	
	debug('end getweather');
}

/**
 * Simple function to log current weather data collected
 */
function logData (err, res, data) {
	debug('logData');
	if (err) throw err;
	else {
		var temp=data.hourly.data[0].temperature;
		var hum=data.hourly.data[0].humidity * 100;
		var date=new Date(data.hourly.data[0].time*1000);
		console.log('date       : '+date + ' ==== ' + temp + ' - '+ hum);
	};
}

/**
 * insertWeatherData function to store values in tempodb series
 */

function insertWeatherData (err, res, data) {
	console.log('insertWeatherData');
	if (err) throw err;
	else {
		var tempOutsideKey = 'location:outside.temperature.1';
		var humOutsideKey  = 'location:outside.humidity.1';
		var forecastdata = data.hourly.data;
		
		forecastdata.forEach(function(element) {
			console.log('date       : '+moment.unix(element.time).toDate() + ' ==== ' + element.temperature + ' - '+ element.humidity * 100);
				var tempoData = [{key:tempOutsideKey, v: element.temperature},
								 {key:humOutsideKey, v: element.humidity * 100}];
								
				var cb = function(result){ console.log('Weather data insertion for ' + result.response); };
		
				tempodb.write_bulk(moment.unix(element.time).toDate(),tempoData,cb);
				}
			);
	}
}

// MAIN
getWeather();

