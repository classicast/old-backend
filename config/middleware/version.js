/* Middleware that makes all the following route formats available:
*  [procotol]://[host]/api/foo ==> redirects to latest version of API
*  [protocol]://[host]/api/v[x].[y].[z]/foo
*/

import restify from 'restify';
import semver from 'semver';
import path from 'path';

export default () => (request, response, next) => {
  const req = request;
  const pathComponents = req.url.split(path.sep);
  const urlVersion = pathComponents[1];

  const headers = req.headers || {};
  const headersVersion = headers['accept-version'];

  if (semver.valid(headersVersion) && semver.valid(urlVersion)) {
    return next(new restify.BadRequestError(
      "version number in url doesn't match Accept-Version header"
    ));
  } else if (semver.valid(headersVersion)) {
    return next();
  } else if (semver.valid(urlVersion)) {
    const pathWithoutVersion = pathComponents.slice(0, 1)
                             .concat(pathComponents.slice(2)).join('/');
    req.url = pathWithoutVersion;
    req.headers = req.headers || {};
    req.headers['accept-version'] = urlVersion;
    return next();
  } else if (!semver.valid(urlVersion) &&
           typeof parseInt(urlVersion[0], 10) === 'number' &&
           !isNaN(parseInt(urlVersion[0], 10))) {
    // if first character in first url component is an integer, but the url
    // component isn't valid semver, assume it's an attempt of specifying an api
    // version
    return next(new restify.BadRequestError(
      'version number must be a complete semver string in the format "X.Y.Z"')
    );
  }
  return next();
};
