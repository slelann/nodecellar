
var TempoDBClient = require('tempodb').TempoDBClient;
var tempodb = new TempoDBClient('18b5f055f1af4bb69e60698ac5812ccf', '9e8380a60d384761a98b722eec55091d');

/** 
 * GET SERIES 
 */
function getSeries(response) {
    console.log("Get series list requested...");
    
    var series_list = "";
    tempodb.get_series({},function(result){
        if (result.response == 200) {
            console.log(JSON.stringify(result.body));
            series_list = JSON.stringify(result.body);
            response.writeHead(200, {"Content-Type": "text/plain"});
            response.write("Series"+'\n');
            response.write(":"+series_list);
            response.end();  
        }        
    });

}


/** 
 * CREATE A SERIE 
 */
function createSerie(series_key) {
    console.log("Start of serie creation for key:"+series_key +"...");
    
   tempodb.create_series(series_key, function(result){
        var out = result.response;
        if (result.body) {
            out += ': ' + JSON.stringify(result.body);
        }
        console.log(out+'\n');
    });
    
    console.log("Serie "+ series_key +" created!");
    
}

function initSeries() {
    console.log("Create series for mycellarconditions");
}

exports.getSeries = getSeries;
exports.createSerie = createSerie;
exports.initSeries = initSeries;
