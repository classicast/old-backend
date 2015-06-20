/**
* Main Application File
*/

'use strict';

var restify = require('restify');
var server = restify.createServer();

// Global ES6 feature poly-fills
// TODO: Remove once Node merges with IO.js and Chrome V8 fully implements ES6
require('es6-promise').polyfill();

// Sanitize Paths before routing
// eg. /label/ --> /label
server.pre(restify.pre.sanitizePath());

// Configure API Routes
require('./config/routes')(server);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
