var https = require('https');
var yacsv = require('ya-csv');
var fs = require('fs');
var mongodb = require('./mongodb');
var iconv = require('iconv-lite');

var wineListRequestUrl = 'https://www.cellartracker.com/xlquery.asp?table=List&Format=csv&Location=1&User=lagnak&Password=satanas';
var csvfilename = '/tmp/cellartracker.csv';

var TYPE={red: 'rouge', white: 'blanc',  };

function readCsv() {
	console.log('--------readCsv...');
	var reader = yacsv.createCsvFileReader(csvfilename, {
			'separator': ',',
			'quote': '"',
			'escape': '',
			'comment': '',
			'encoding': 'utf-8',
			'columnsFromHeader': true
		});
		//reader.setColumnNames([ 'iWine','WineBarcode','Quantity','Pending','Location','Bin','Size','Price','Valuation','MyValue','WBValue','CTValue','MenuPrice', 'Vintage',
		//						'Wine','Locale','Country','Region','SubRegion','Appellation','Producer','SortProducer','Type','Varietal','MasterVarietal','Designation',
		//						'Vineyard','WA','WS','IWC','BH','WE','JR','RH','JG','GV','JK','LD','CW','WFW','PR','SJ','WD','RR','JH','MFW','WWR','IWR','CHG','TT','CT','MY','BeginConsume','EndConsume','UPC' ]);
		//Insertion des data
		reader.addListener('data', function(data) {
			//console.log(data);
			if(data.CT == '"') { data.CT = 0;} else { data.CT = parseInt(data.CT)};
			if(data.Price == '"') { data.Price = 0;} else { data.Price = parseInt(data.Price)};
			if(data.Designation=='Unknown') { data.Designation='';}
			if(data.Vineyard=='Unknown') { data.Vineyard='';}
			if(data.SubRegion=='Unknown') { data.SubRegion='';}
			if(data.Bin=='"') { data.Bin='';}

			//TODO data.Type=transcode ?
			//saveCellarTrackerData(data);
			mongodb.saveWine(data);

		});

}

function saveCellarTrackerData(data) {
	//console.log('--------saveCellarTrackerData...');
	mongodb.saveWine(data);
}

function getCellarTrackerData() {
	console.log('--------getCellarTrackerData...');

	var csvfile = fs.createWriteStream(csvfilename, {flags: 'w'});

	https.get(wineListRequestUrl, function(res) {
		//console.log("statusCode: ", res.statusCode);
		//console.log("headers: ", res.headers);
		res.on('data', function(d) {
			csvfile.write(iconv.decode(new Buffer(d), 'latin1')); // decoding des chracteres latin1
		}).on('end', function () {
			csvfile.end();
			console.log('file created !');
			readCsv();
		});
	}).on('error', function(e) {
		console.error(e);
	});

}

module.exports.getCellarTrackerData=getCellarTrackerData;


//getCellarTrackerData();
//mongodb.getWinesByCountry();
//mongodb.getWinesByType();
//mongodb.getWinesByVintage();

