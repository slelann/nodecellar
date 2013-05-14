var tempodbclient = require('./tempodbclient');

function start(response) {
  console.log("Le gestionnaire 'start' est appelé.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Bonjour Start");
  response.end();
}

function series(response) {
  console.log("Le gestionnaire 'series' est appelé.");
  //var seriesList = tempodbclient.getSeries();
  //console.log("requesthandlers - series="+seriesList);
  tempodbclient.getSeries(response);
}

exports.start = start;
exports.series = series;
