var debug = require('debug')('router'),
    impl = require('implementjs'),
	restrict = require('../authent').restrict;

// Two dependencies, an Express HTTP app and a handler
module.exports = function (app, handler) {
    debug('setting up routes for tempodb...');

    // Validate handler's interface
    impl.implements(handler, {renderSeries: impl.F});
    impl.implements(handler, {renderChart: impl.F});
	impl.implements(handler, {renderSeriesData: impl.F});
	impl.implements(handler, {chartData: impl.F});
    
    //Tempodb interface
    app.get('/series', restrict, handler.renderSeries);
    app.get('/series/data', restrict, handler.renderSeriesData);
    app.get('/chart', restrict, handler.renderChart);
    app.get('/chartData', restrict, handler.chartData);
    
};
