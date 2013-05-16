module.exports = function(db) {
	var handler = {};
  
	handler.renderIndex = function (req, res) {
             res.render('index', {title: "Express Boilerplate"});
         };

	handler.renderCurrentTemp  = function (req, res) {
			db.forecastio.get(req, function(err,result,data) {
             res.send(data);
			});
         };
  
  return handler;
}