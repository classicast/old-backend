/**
* Main Application File
*/

'use strict';

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

// TODO: Configure Database Connection
// app.set('database', require('./config/database'));
// var database = app.get('database');


function boot(port){
  // TODO: Sync database here first, then do the following:
  if (config.env === 'test') {
    return server.listen(port);
  }
  else {
    return server.listen(port, config.ip, function () {
      console.log(
        'Restify server listening on %d, in %s mode',
        config.port,
        config.env
      );
    });
  }
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
