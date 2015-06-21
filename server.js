/**
* Main Application File
*/

'use strict';

var restify = require('restify');
var server = restify.createServer({
  name: 'classicaldb-metadata',
  versions: ['1.0.0']
});

var prefix = require('./config/middleware/api_prefix');

// Global ES6 feature poly-fills
// TODO: Remove once Node merges with IO.js and Chrome V8 fully implements ES6
require('es6-promise').polyfill();

var apiPrefix = '/api';

// Configure Middleware
server.pre(prefix({ prefix: apiPrefix })); // Validate endpoint prefix

// Sanitize Paths before routing
// eg. /api/label/ --> /api/label
server.pre(restify.pre.sanitizePath());

// Configure API Routes
require('./config/routes')(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
