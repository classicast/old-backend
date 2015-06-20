// Courtesy of https://github.com/markotom/restify-url-semver
// Using code here instead of using that NPM module in order to reduce
// number of third-party dependencies that might not be maintained

/* Middleware that makes all the following route formats available:
*  [protocol]://[host]/api/v[x]/foo
*  [protocol]://[host]/api/v[x].[y]/foo
*  [protocol]://[host]/api/v[x].[y].[z]/foo
*/

'use strict';

var restify = require('restify');
var semver  = require('semver');

module.exports = function (options) {
  options = options || {};

  options.prefix = options.prefix || '';

  return function (req, res, next) {
    req.url = req.url.replace(options.prefix, '');

    var pieces = req.url.replace(/^\/+/, '').split('/');
    var version = pieces[0];

    version = version.replace(/v(\d{1})\.(\d{1})\.(\d{1})/, '$1.$2.$3');
    version = version.replace(/v(\d{1})\.(\d{1})/, '$1.$2.0');
    version = version.replace(/v(\d{1})/, '$1.0.0');

    if (semver.valid(version)) {
      req.url = req.url.replace(pieces[0], '');
      req.headers = req.headers || [];
      req.headers['accept-version'] = version;
    }
    else {
      return next(new restify.InvalidVersionError('API version must be specified'));
    }

    next();
  };
};
