/**
 * Start PM2 Process Manager
 */

var pm2 = require('pm2');

var instances;
var maxMemory;
var execMode;

if (process.env.NODE_ENV === 'production') {
  instances = process.env.WEB_CONCURRENCY || -1; // Set by Heroku or -1 to scale to max cpu core -1
  maxMemory = process.env.WEB_MEMORY || 512;    // " " "
  execMode = 'cluster'; // ----> https://github.com/Unitech/PM2/blob/master/ADVANCED_README.md#schema
}

else {
  instances = 1;
  maxMemory = 512;
  execMode = 'fork';
}

pm2.connect(function() {
  pm2.start({
    script    : 'index.js',
    name      : 'api.classicaldb.org',     // ----> THESE ATTRIBUTES ARE OPTIONAL:
    exec_mode : execMode,
    instances : instances,
    max_memory_restart : maxMemory + 'M',   // Auto restart if process taking more than XXmo
  }, function(err) {
    if (err) return console.error('Error while launching applications', err.stack || err);
    console.log('PM2 and application has been succesfully started');

    // Display logs in standard output
    pm2.launchBus(function(err, bus) {
      console.log('[PM2] Log streaming started');

      bus.on('log:out', function(packet) {
       console.log('[App:%s] %s', packet.process.name, packet.data);
      });

      bus.on('log:err', function(packet) {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data);
      });
    });
  });
});
