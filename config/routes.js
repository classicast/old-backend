/**
* Main application routes
*/

'use strict';

var glob = require('glob');
var path = require('path');

module.exports = function(server) {
  // Traverse directories in 'api' directory in project root, and register any
  // routes in resource directory, which will be named as '<resource>_routes.js'
  var routes = glob.sync('api/**/*_routes.js').map(function(route) {
    return path.join(__dirname, '../', route);
  });
  routes.forEach(function(route) {
    require(route)(server);
  });
};
