var Forecast = require('forecast.io');
//var util = require("util");

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

// Coordonnees de Rennes
//var latitude  = "48.1076";
//var longitude = "-1.6845";

var options = {
   units:   "si",
   exclude: "minutely,hourly,daily,flags,alerts"
};

//var time = new Date().getTime(); 

forecast.get(latitude, longitude, options, function (err, res, data) {
  if (err) throw err;
  else {
      //console.log('data: ' + util.inspect(data));
      var temp=data.currently.temperature;
      var hum=data.currently.humidity * 100;
      var date=new Date(data.currently.time);
      console.log('date       : '+date);
      console.log('temperature: '+temp);
      console.log('humidite   : '+hum);
      
  };
});

