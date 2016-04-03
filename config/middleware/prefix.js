/* Middleware that will throw an error if an API prefix is not in the route
*/

import { BadRequestError } from 'restify';

export default (options) => {
  const opts = options || {};
  opts.prefix = opts.prefix || '';

  return (request, response, next) => {
    const req = request;
    if (req.url.indexOf(opts.prefix) === -1) {
      return next(new BadRequestError('API requests must begin with "api": ' +
        '/api/<version[optional]>/<resource>'));
    }
    // removes prefix for downstream route handling / matching
    req.url = req.url.replace(opts.prefix, '');
    return next();
  };
};
