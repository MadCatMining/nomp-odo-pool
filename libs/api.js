var redis = require('redis');
var async = require('async');

var stats = require('./stats.js');

module.exports = function(logger, portalConfig, poolConfigs){
    var _this = this;

    var portalStats = this.stats = new stats(logger, portalConfig, poolConfigs);

    this.liveStatConnections = {};

    this.handleApiRequest = function(req, res, next){
        switch(req.params.method){
            case 'stats':
                res.set('Content-Type', 'application/json');
                res.set('Access-Control-Allow-Origin', '*');
                res.set('X-Robots-Tag', 'none');
                res.end(portalStats.statsString);
                return;
            case 'pool_stats':
                res.set('Content-Type', 'application/json');
                res.set('Access-Control-Allow-Origin', '*');
                res.set('X-Robots-Tag', 'none');
                res.end(JSON.stringify(portalStats.statPoolHistory));
                return;
            case 'live_stats':
                res.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*',
                    'X-Robots-Tag': 'none'
                });
                res.write('\n');
                var uid = Math.random().toString();
                _this.liveStatConnections[uid] = res;
                res.flush();
                req.on("close", function() {
                    delete _this.liveStatConnections[uid];
                });
                return;
            default:
                next();
        }
    };

    this.handleAdminApiRequest = function(req, res, next){
        switch(req.params.method){
            case 'pools': {
                res.end(JSON.stringify({result: poolConfigs}));
                return;
            }
            default:
                next();
        }
    };
};
