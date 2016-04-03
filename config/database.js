'use strict';

import path from 'path';
import glob from 'glob';
import Sequelize from 'sequelize';

import config from './environment';

let sequelize;
const db = {};

/* istanbul ignore if */
if (config.env === 'production') {
  const match = config.postgres.uri.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

  sequelize = new Sequelize(match[5], match[1], match[2], {
    host: match[3],
    port: match[4],
    protocol: 'postgres',
    dialect: 'postgres',
    sync: { force: false },
  });
} else {
  sequelize = new Sequelize(
    config.postgres.dbname,
    config.postgres.username,
    config.postgres.password,
    {
      host: 'localhost',
      port: 5432,
      protocol: 'postgres',
      dialect: 'postgres',
      sync: { force: false },
    }
  );
}

const models = glob.sync(path.join(config.root, '/api/**/*.model.js'));
models.forEach(file => {
  const model = sequelize.import(file);
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
