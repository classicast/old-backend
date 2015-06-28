'use strict';

var path   = require('path');
var assign = require('object-assign');

// sets default NODE_ENV to 'development' if not already specified
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// All configurations will extend these options
// ============================================
var all = {

  // Node Environment
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(path.join(__dirname, '/../..')),

  // Server port
  port: process.env.PORT || 5101,

  // Secret for session, you will want to change this and make it an environment variable
  // secrets: {
  //   session: 'cdb-metadata-service-secret'
  // },

  // List of user roles
  // userRoles: ['guest', 'user', 'admin'],
};

var envConfig = {};

// Production specific configuration
// =================================
envConfig.production = {
  // Server port
  port: process.env.PORT || 8080,

  // Should we populate the DB with sample data?
  // seedDB: false,

  // PostgreSQL connection options
  // postgres: {
  //   uri: process.env.POSTGRES_URI,
  // }
};


// Development specific configuration
// ==================================
envConfig.development = {
  // Should we populate the DB with sample data?
  // seedDB: true,

  // PostgreSQL connection options
  postgres: {
    dbname: 'cdb_metadata_service_dev',
    username: 'cdb',
    password: null
  }
};


// Test specific configuration
// ===========================
envConfig.test = {
  // Server port
  port: process.env.PORT || 5202,

  // Should we populate the DB with sample data?
  // seedDB: false,

  // PostgreSQL connection options
  postgres: {
    dbname: 'cdb_metadata_service_test',
    username: 'cdb',
    password: null
  }
};


// Export the config object based on the NODE_ENV
// ==============================================
module.exports = assign(all, envConfig[process.env.NODE_ENV]);
