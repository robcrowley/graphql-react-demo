'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configure = undefined;

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*eslint no-process-env: "0"*/
var configure = exports.configure = function configure() {
    _dotenv2.default.config({ silent: true });

    var port = process.env.PORT || 4000;
    var graphqlPath = process.env.GRAPHQL_PATH || '/graphql';
    var voyagerPath = process.env.VOYAGER_PATH || '/voyager';
    var queryComplexity = {
        maxDepth: parseInt(process.env.MAX_QUERY_DEPTH || 10),
        maxCost: parseInt(process.env.MAX_QUERY_COST || 50),
        defaultCost: parseInt(process.env.QUERY_COST_DEFAULT || 1)
    };
    var token = {
        secret: process.env.JWT_SIGNING_SECRET,
        expiry: process.env.JWT_EXPIRY || '1h'
    };
    var apolloEngineKey = process.env.APOLLO_ENGINE_KEY;
    var redisCache = {
        host: process.env.REDIS_CACHE_HOST || '127.0.0.1',
        port: process.env.REDIS_CACHE_PORT || 6379
    };

    return { port: port, graphqlPath: graphqlPath, voyagerPath: voyagerPath, queryComplexity: queryComplexity, token: token, apolloEngineKey: apolloEngineKey, redisCache: redisCache };
};

exports.default = configure();