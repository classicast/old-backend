/**
* Express Configuration
*/

'use strict';

var restify = require('restify');

var config  = require('./environment');
var version = require('./middleware/version');

module.exports = function(server){

  // Configure Middleware that runs before routing
  server.pre(version()); // Add semver versioning
  server.pre(restify.pre.sanitizePath()); // eg. /label///// --> /label

  // Configure middleware that runs on all routes
  server.use(restify.gzipResponse());
  server.use(restify.bodyParser());

  // if (config.env === 'dev') {
  //   // Put environment specific middleware here
  // }
};
