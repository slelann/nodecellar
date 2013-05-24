module.exports = function(db) {
	var handler = {};

	handler.renderCurrentTemp  = function (req, res) {
			db.forecastio.get(req, function(err,result,data) {
             res.send(data);
			});
         };
  
  return handler;
}