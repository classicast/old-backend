/**
* Main application routes
*/

import glob from 'glob';
import path from 'path';

export default (server) => {
  // Traverse directories in 'api' directory in project root, and register any
  // routes in resource directory, which will be named as '<resource>_routes.js'
  const routes = glob.sync('api/**/*.routes.js').map(route =>
    path.join(__dirname, '../', route)
  );
  routes.forEach(route => {
    require(route).default(server);
  });
};
