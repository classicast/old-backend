import path from 'path';
import dbConfig from './databaseConfig';

// sets default NODE_ENV to 'development' if not already specified
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// All configurations will extend these options
// ============================================
const all = {

  // Node Environment
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(path.join(__dirname, '/..')),

  // Server port
  port: process.env.PORT || 5101,

  // Secret for session, you will want to change this and make it an environment variable
  // secrets: {
  //   session: 'cdb-metadata-service-secret'
  // },

  // List of user roles
  // userRoles: ['guest', 'user', 'admin'],
};

const envConfig = {};

// Production specific configuration
// =================================
envConfig.production = {
  // Server port
  port: process.env.PORT || 8080,

  // PostgreSQL connection options
  postgres: {
    uri: process.env[dbConfig.production.use_env_variable],
  },
};


// Development specific configuration
// ==================================
envConfig.development = {
  // PostgreSQL connection options
  postgres: dbConfig.development,
};


// Local Test specific configuration
// ===========================
envConfig.test_local = {
  // Server port
  port: process.env.PORT || 5202,

  // PostgreSQL connection options
  postgres: dbConfig.test_local,
};

// CI Test specific configuration
// ===========================
envConfig.test_ci = {
  // Server port
  port: process.env.PORT || 5202,

  // Should we populate the DB with sample data?
  seedDB: false,

  // PostgreSQL connection options
  postgres: dbConfig.test_ci,
};


// Export the config object based on the NODE_ENV
// ==============================================
export default Object.assign({}, all, envConfig[process.env.NODE_ENV]);
