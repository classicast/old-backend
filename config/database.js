'use strict';

var fs        = require('fs');
var path      = require('path');
var glob      = require('glob');
var Sequelize = require('sequelize');
var config    = require('./environment');

var sequelize;
var db = {};

/* istanbul ignore if */
if (config.env === 'production') {
  var match = config.postgres.uri.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

  sequelize = new Sequelize(match[5], match[1], match[2], {
    host: match[3],
    port: match[4],
    protocol: 'postgres',
    dialect: 'postgres',
    sync: { force: false }
  });

} else {
  sequelize = new Sequelize(config.postgres.dbname, config.postgres.username, config.postgres.password, {
    host: 'localhost',
    port: 5432,
    protocol: 'postgres',
    dialect: 'postgres',
    sync: { force: true }
  });
}

var models = glob.sync(path.join(config.root, '/api/**/*.model.js'));
models.forEach(function(file){
  var model = sequelize.import(file);
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
