// TODO: replace this for production
// https://medium.com/@Cuadraman/how-to-use-babel-for-production-5b95e7323c2f#.6dvvnj797
require('babel-register');
require('babel-polyfill');
const config = require('./config/environment').default;
const server = require('./server');

server.boot(config.port);
