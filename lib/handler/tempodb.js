module.exports = function(db) {
	var handler = {};

	handler.renderSeries = function (req, res) {
             res.render('series', {title: "TempoDB series"});
         };

	return handler;
}