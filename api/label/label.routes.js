'use strict';

var path = require('path');
var ctrl = require('./label.controller');
var resource = 'label';

module.exports = function(server) {
  server.get({ path: path.join(resource, '/'), version: '1.0.0'}, ctrl.readAll);
  // server.get({ path: path.join(resource, '/:id'), version: '1.0.0'}, ctrl.read);
  // server.post({ path: path.join(resource, '/'), version: '1.0.0'}, ctrl.create);
  // server.put({ path: path.join(resource, '/:id'), version: '1.0.0'}, ctrl.update);
  // server.del({ path: path.join(resource, '/:id'), version: '1.0.0'}, ctrl.delete);
};
