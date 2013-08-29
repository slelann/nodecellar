var https = require('https');
var csv = require('csv');
var fs = require('fs');
var mongodb = require('./mongodb');
var Iconv = require('iconv').Iconv;

var wineListRequestUrl = 'https://www.cellartracker.com/xlquery.asp?table=List&Format=csv&Location=1&User=lagnak&Password=satanas';
var csvfilename = '/tmp/cellartracker.csv';

function readCsv() {
	console.log('--------readCsv...');
	var opts = {encoding: 'latin1'};
	csv()
	.from.path(csvfilename, { delimiter: ',', escape: '"' })
	.to.stream(fs.createWriteStream(__dirname+'/sample.out'))
	.transform( function(row){
	row.unshift(row.pop());
	return row;
	})
	.on('record', function(row,index){
	console.log('#'+index+' '+JSON.stringify(row));
	})
	.on('close', function(count){
	// when writing to a file, use the 'close' event
	// the 'end' event may fire before the file has been written
	console.log('Number of lines: '+count);
	})
	.on('error', function(error){
	console.log(error.message);
	});


}

function saveCellarTrackerData(data) {
	//console.log('--------saveCellarTrackerData...');
	//mongodb.saveWine(data);
	var iconv = new Iconv('latin1', 'utf-8');
	console.log(data.Wine + ' == ' + iconv.decode(data.Wine).toString('utf-8'));

}

function getCellarTrackerData() {
	console.log('--------getCellarTrackerData...');

	var csvfile = fs.createWriteStream(csvfilename, {flags: 'w'});

	https.get(wineListRequestUrl, function(res) {
		//console.log("statusCode: ", res.statusCode);
		console.log("headers: ", res.headers);
		res.on('data', function(d) {
			csvfile.write(d);
		}).on('end', function () {
			csvfile.end();
			console.log('file created !');
			readCsv();
		});
	}).on('error', function(e) {
		console.error(e);
	});

}

getCellarTrackerData();
