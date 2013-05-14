var TempoDBClient = require('tempodb').TempoDBClient;
var tempodb = new TempoDBClient('18b5f055f1af4bb69e60698ac5812ccf', '9e8380a60d384761a98b722eec55091d');


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


createSerie('location:outside.temperature.1');
createSerie('location:outside.humidity.1');
createSerie('location:cellar.temperature.1');
createSerie('location:cellar.humidity.1');
