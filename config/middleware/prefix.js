/* Middleware that will throw an error if an API prefix is not in the route
*/

'use strict';

var restify = require('restify');

module.exports = function (options) {
  options = options || {};
  options.prefix = options.prefix || '';

  return function (req, res, next) {
    if (req.url.indexOf(options.prefix) === -1) {
      return next(new restify.BadRequestError('API requests must begin with "api": /api/<version[optional]>/<resource>'));
    }
    else {
      // removes prefix for downstream route handling / matching
      req.url = req.url.replace(options.prefix, '');
      return next();
    }
  };
};
