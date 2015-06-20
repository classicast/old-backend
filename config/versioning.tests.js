// Courtesy of https://github.com/markotom/restify-url-semver
// Using code here instead of using that NPM module in order to reduce
// number of third-party dependencies that might not be maintained

'use strict';

var expect = require('chai').expect;
var request = require('supertest');
var restify = require('restify');
var sinon = require('sinon');
var versioning = require('./versioning');

describe('versioning middleware', function () {
  var next;

  beforeEach(function () {
    next = sinon.spy();
  });

  it('should be a function', function () {
    expect(typeof versioning).to.equal('function');
  });

  it('should return a function as middleware', function () {
    expect(typeof versioning()).to.equal('function');
  });

  it('should return an invalid version error', function () {
    var req = { url: '/foo' };
    versioning()(req, null, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWith(new restify.InvalidVersionError('API version must be specified'))).to.be.true;
    expect(next.args[0][0] instanceof restify.InvalidVersionError).to.be.true;
  });

  it('should return a valid version in format v[x]', function () {
    var req = { url: '/v1/foo' };
    versioning()(req, null, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWithExactly()).to.be.true;
    expect(req.headers['accept-version']).to.equal('1.0.0');
  });

  it('should return a valid version in format v[x].[y]', function () {
    var req = { url: '/v1.2/foo' };
    versioning()(req, null, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWithExactly()).to.be.true;
    expect(req.headers['accept-version']).to.equal('1.2.0');
  });

  it('should return a valid version in format v[x].[y].[z]', function () {
    var req = { url: '/v1.2.3/foo' };
    versioning()(req, null, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWithExactly()).to.be.true;
    expect(req.headers['accept-version']).to.equal('1.2.3');
  });

  it('should returns a valid version in format /prefix/v[x].[y].[z]', function () {
    var req = { url: '/api/v2/foo' };
    versioning({ prefix: '/api' })(req, null, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWithExactly()).to.be.true;
    expect(req.headers['accept-version']).to.equal('2.0.0');
  });
});

describe('Restify URL without prefix', function () {
  var server, agent;

  before(function () {
    // Create restify server for testing
    server = restify.createServer();
    server.pre(versioning());

    server.get({ path: '/example', version: '1.0.0' }, function (req, res) {
      res.send({ message: 'accept-version: 1.0.0' });
    });

    server.get({ path: '/example', version: '1.2.0' }, function (req, res) {
      res.send({ message: 'accept-version: 1.2.0' });
    });

    server.get({ path: '/example', version: '1.2.3' }, function (req, res) {
      res.send({ message: 'accept-version: 1.2.3' });
    });

    // Create restify agent (client) for testing
    agent = request(server);
  });

  it('should be able to parse a version in format /v[x]', function (done) {
    agent.get('/v1/example').expect(200, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('accept-version: 1.0.0');
      done();
    });
  });

  it('should be able to parse a version in format /v[x].[y]', function (done) {
    agent.get('/v1.2/example').expect(200, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('accept-version: 1.2.0');
      done();
    });
  });

  it('should be able to parse a version in format /v[x].[y].[z]', function (done) {
    agent.get('/v1.2.3/example').expect(200, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('accept-version: 1.2.3');
      done();
    });
  });
});

describe('Restify URL with prefix', function () {
  var server, agent;

  before(function () {
    // Create restify server for testing
    server = restify.createServer();
    server.pre(versioning({ prefix: '/api' }));

    server.get({ path: '/example', version: '1.0.0' }, function (req, res) {
      res.send({ message: 'accept-version: 1.0.0' });
    });

    server.get({ path: '/example', version: '1.2.0' }, function (req, res) {
      res.send({ message: 'accept-version: 1.2.0' });
    });

    server.get({ path: '/example', version: '1.2.3' }, function (req, res) {
      res.send({ message: 'accept-version: 1.2.3' });
    });

    // Create restify agent (client) for testing
    agent = request(server);
  });

  it('should be able to parse a version in format /[prefix]/v[x]', function (done) {
    agent.get('/api/v1/example').expect(200, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('accept-version: 1.0.0');
      done();
    });
  });

  it('should be able to parse a version in format /[prefix]/v[x].[y]', function (done) {
    agent.get('/api/v1.2/example').expect(200, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('accept-version: 1.2.0');
      done();
    });
  });

  it('should be able to parse a version in format /[prefix]/v[x].[y].[z]', function (done) {
    agent.get('/api/v1.2.3/example').expect(200, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('accept-version: 1.2.3');
      done();
    });
  });
});
