var TempoDBClient = require('tempodb').TempoDBClient;
var tempodb = new TempoDBClient('18b5f055f1af4bb69e60698ac5812ccf', '9e8380a60d384761a98b722eec55091d');

var series_key = 'mykey',
series_start_date = new Date('2012-01-01'),
series_end_date = new Date('2012-01-02');

// read a date range
var options = {
key: series_key,
interval: '1hour',
'function': 'mean'
}

var start_time = new Date();
tempodb.read(series_start_date, series_end_date, options, function(result){
console.log(result.response + ': ' + JSON.stringify(result.body));
console.log('Completed in', new Date() - start_time, 'ms\n');
});

