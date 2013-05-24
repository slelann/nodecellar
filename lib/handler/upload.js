var yacsv = require('ya-csv');

module.exports = function(db) {

	var handler = {};

	handler.displayUploadForm = function (req, res) {
		res.render('upload',  {title: 'CSV upload form'});
	};

	handler.upload = function (req, res) {
		console.log(req.files.csvuploadfile.path);
		console.log(req.files.csvuploadfile.size);
		//Read and parse csv data
		var reader = yacsv.createCsvFileReader(req.files.csvuploadfile.path, {
			'separator': ',',
			'quote': '"',
			'escape': '"',       
			'comment': 'H',
		});
		reader.setColumnNames([ 'measureDate','temperature','humidity','interval','transfertTime','remark' ]);
		//Insertion des data
		reader.addListener('data', function(data) {
			insertTempoData(data);
		});
		
		//Redirection vers accueil
		res.redirect('/');
	};
	
	function insertTempoData(data) {
		console.log(data.measureDate + " = " + data.temperature + '-' + data.humidity);
		
		var timestamp = new Date(data.measureDate+':00 GMT' ); //Fix pb de timezone : GMT-0500 (EST)
		var tempCellarKey = 'location:cellar.temperature.1';
		var humCellarKey  = 'location:cellar.humidity.1';
		
		var tempodata = [{key:tempCellarKey, v: Number(data.temperature)}, {key:humCellarKey, v: Number(data.humidity) }];
		
		db.tempodb.insertSeriesData(timestamp, tempodata,null);
	}

	return handler;
};