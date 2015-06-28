/**
* Main Application File
*/

'use strict';

var Promise = require('es6-promise').Promise;
var restify = require('restify');
var config  = require('./config/environment');

// Setup Server
var server = restify.createServer({
  name: 'classicaldb-metadata',
  versions: ['1.0.0']
});

// Configure Restify and Routes
require('./config/restify')(server);
require('./config/routes')(server);

// Configure Database Connection
var database = require('./config/database');


function boot(port){
  return new Promise(function(resolve, reject){
    //Create Database Connection
    database.sequelize.sync()
    .then(function() {
      if (config.env === 'test') {
        console.log('test');
        resolve(server.listen(port));
      }
      else {
        resolve(server.listen(port, config.ip, function () {
          console.log(
            'Restify server listening on %d, in %s mode',
            config.port,
            config.env
          );
        }));
      }
    });
  });
}

// If this file is run directly, start the app
if(require.main === module){
  boot(config.port);
}
// Else if this file is imported by another module (like a test)
// export the boot function
else {
  exports.boot = boot;
}
