module.exports = function(db) {
	var handler = {};

	handler.renderStats  = function (req, res) {
			res.render('stats', {title: "My cellar stats"});
         };
  
  return handler;
}