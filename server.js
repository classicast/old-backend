/**
* Main Application File
*/

import restify from 'restify';

import config from './config/environment';
import restifyConfig from './config/restify';
import routes from './config/routes';
import database from './config/database';

// Setup Server
const server = restify.createServer({
  name: 'classicaldb-metadata',
  versions: ['1.0.0'],
});

// Configure Restify and Routes
// TODO: figure out an elegant way to produce this pattern using ES2015 imports
restifyConfig(server);
routes(server);

// Export this function so that it can be used inside of tests
export function boot(port) {
  return new Promise((resolve) => {
    // Create Database Connection
    database.sequelize.sync()
    .then(() => {
      if (config.env === 'test_local' || config.env === 'test_ci') {
        resolve(server.listen(port));
      } else {
        resolve(server.listen(port, config.ip, () => {
          // TODO: implement good logging
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
