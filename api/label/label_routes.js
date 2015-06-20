'use strict';

var path = require('path');
var controller = require('./label_controller');
var endpointPrefix = 'label';

module.exports = function(server) {
  server.get(path.join(endpointPrefix,  '/'),    controller.readAll);
  // server.get(path.join(endpointPrefix,  '/:id'), controller.read);
  // server.post(path.join(endpointPrefix, '/'),    controller.create);
  // server.put(path.join(endpointPrefix,  '/:id'), controller.update);
  // server.del(path.join(endpointPrefix,  '/:id'), controller.delete);
};
