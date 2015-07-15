/* Middleware that makes all the following route formats available:
*  [procotol]://[host]/api/foo ==> redirects to latest version of API
*  [protocol]://[host]/api/v[x].[y].[z]/foo
*/

'use strict';

var restify = require('restify');
var semver  = require('semver');
var path = require('path');

module.exports = function () {
  return function (req, res, next) {
    var pathComponents = req.url.split(path.sep);
    var urlVersion = pathComponents[1];

    var headers = req.headers || {};
    var headersVersion = headers['accept-version'];

    if (semver.valid(headersVersion) && semver.valid(urlVersion)) {
      return next(new restify.BadRequestError(
        "version number in url doesn't match Accept-Version header"
      ));
    }
    else if (semver.valid(headersVersion)) {
      return next();
    }
    else if (semver.valid(urlVersion)) {
      var pathWithoutVersion = pathComponents.slice(0,1)
                               .concat(pathComponents.slice(2)).join('/');
      req.url = pathWithoutVersion;
      req.headers = req.headers || {};
      req.headers['accept-version'] = urlVersion;
      return next();
    }
    // if first character in first url component is an integer, but the url
    // component isn't valid semver, assume it's an attempt of specifying an api
    // version
    else if (!semver.valid(urlVersion) &&
             typeof parseInt(urlVersion[0]) === 'number' &&
             !isNaN(parseInt(urlVersion[0]))) {
      return next(new restify.BadRequestError(
        'version number must be a complete semver string in the format "X.Y.Z"')
      );
    }
    else {
      return next();
    }
  };
};
