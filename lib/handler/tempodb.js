module.exports = function(db) {
	var handler = {};

	handler.renderSeries = function (req, res) {
			db.tempodb.getSeries(req,function(result) {
			res.send(JSON.stringify(result.body,null,'\t'));
		});
     };

	handler.renderSeriesData = function (req, res) {
			db.tempodb.getSeriesData(req,function(result) {
			res.send(JSON.stringify(result.body,null,'\t'));
		});
     };

	return handler;
};