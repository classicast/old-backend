'use strict';

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

var restify = require('restify');
var request = require('supertest');
var sinon = require('sinon');
var version = require('./version');
var assign = require('object-assign');

describe('version middleware', function () {
  var next;

  beforeEach(function () {
    next = sinon.spy();
  });

  it('should be a function', function () {
    expect(typeof version).to.equal('function');
  });

  it('should return a function as middleware', function () {
    expect(typeof version()).to.equal('function');
  });

  it('should do nothing when no API version is specified in URL or headers', function() {
    var req = { url: '/foo' };
    var cachedReq = assign({}, req);
    version()(req, null, next);
    expect(req).to.deep.equal(cachedReq);
    expect(next).to.have.been.calledOnce;
    expect(next.calledWithExactly()).to.be.true;
  });

  it('should set API version when version is set only in URL', function() {
    var req = { url: '/1.0.0/foo' };
    version()(req, null, next);
    expect(req.headers['accept-version']).to.equal('1.0.0');
    expect(req.url).to.equal('/foo');
    expect(next).to.have.been.calledOnce;
    expect(next.calledWithExactly()).to.be.true;
  });

  it("should do nothing when version is set only in request's Accept-Version header", function() {
    var req = {
      url: '/foo',
      headers: {
        'accept-version': '1.2.3'
      }
    };
    var cachedReq = assign({}, req);
    version()(req, null, next);
    expect(req).to.deep.equal(cachedReq);
    expect(next).to.have.been.calledOnce;
    expect(next.calledWithExactly()).to.be.true;
  });

  it('should return a 400 BadRequestError if URL and header versions conflict', function () {
    var req = {
      url: '/1.2.3/foo',
      headers: {
        'accept-version': '2.3.4'
      }
    };
    version()(req, null, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWith(new restify.BadRequestError(
      "version number in url doesn't match Accept-Version header"
    ))).to.be.true;
    expect(next.args[0][0] instanceof restify.BadRequestError).to.be.true;
  });

  it('should return a 400 BadRequestError if URL version is incomplete (X)', function () {
    var req = { url: '/1/foo' };
    version()(req, null, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWith(new restify.BadRequestError(
      'version number must be a complete semver string in the format "X.Y.Z"'
    ))).to.be.true;
    expect(next.args[0][0] instanceof restify.BadRequestError).to.be.true;
  });

  it('should return a 400 BadRequestError if URL version is incomplete (X.Y)', function () {
    var req = { url: '/1.2/foo' };
    version()(req, null, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWith(new restify.BadRequestError(
      'version number must be a complete semver string in the format "X.Y.Z"'
    ))).to.be.true;
    expect(next.args[0][0] instanceof restify.BadRequestError).to.be.true;
  });

  it('should return a 400 BadRequestError if URL version is malformed (X...)', function () {
    var req = { url: '/1as4vasd/foo' };
    version()(req, null, next);
    expect(next.calledOnce).to.be.true;
    expect(next.calledWith(new restify.BadRequestError(
      'version number must be a complete semver string in the format "X.Y.Z"'
    ))).to.be.true;
    expect(next.args[0][0] instanceof restify.BadRequestError).to.be.true;
  });

});

describe('versioning server responses for /example route', function () {
  var server, agent;

  before(function () {
    // Create restify server for testing
    server = restify.createServer({
      versions: ['1.0.0', '1.2.0', '1.2.3']
    });
    server.pre(version());

    server.get({ path: '/example', version: '1.0.0' }, function (req, res) {
      res.send({ message: 'Accept-Version: 1.0.0' });
    });

    server.get({ path: '/example', version: '1.2.0' }, function (req, res) {
      res.send({ message: 'Accept-Version: 1.2.0' });
    });

    server.get({ path: '/example', version: '1.2.3' }, function (req, res) {
      res.send({ message: 'Accept-Version: 1.2.3' });
    });

    // Create restify agent (client) for testing
    agent = request(server);
  });

  it('should serve latest version of API for requests without specified version in URL or headers', function (done) {
    agent.get('/example').expect(200, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('Accept-Version: 1.2.3');
      done();
    });
  });

  it('should serve specific version of API for requests with version in URL', function (done) {
    agent.get('/1.2.0/example').expect(200, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('Accept-Version: 1.2.0');
      done();
    });
  });

  it('should serve specific version of API for requests with version in Accept-Version header', function (done) {
    agent.get('/example')
    .set('Accept-Version', '1.2.0')
    .expect(200, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('Accept-Version: 1.2.0');
      done();
    });
  });

  it('should return a 400 BadRequestError if URL and header versions conflict', function(done) {
    agent.get('/1.2.3/example')
    .set('Accept-Version', '1.2.0')
    .expect(400, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal("version number in url doesn't match Accept-Version header");
      done();
    });
  });

  it('should return a 400 BadRequestError if URL version is incomplete (X)', function(done) {
    agent.get('/1/example')
    .expect(400, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('version number must be a complete semver string in the format "X.Y.Z"');
      done();
    });
  });

  it('should return a 400 BadRequestError if URL version is incomplete (X.Y)', function(done) {
    agent.get('/1.2/example')
    .expect(400, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('version number must be a complete semver string in the format "X.Y.Z"');
      done();
    });
  });

  it('should return a 400 BadRequestError if URL version is malformed (X...)', function(done) {
    agent.get('/1asdv/example')
    .expect(400, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('version number must be a complete semver string in the format "X.Y.Z"');
      done();
    });
  });

  it('should return a 400 BadRequestError if URL version number is not supported by API', function(done) {
    agent.get('/1.2.5/example')
    .expect(400, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('1.2.5 is not supported by GET /example');
      done();
    });
  });

  it('should return a 400 BadRequestError if header version number is not supported by API', function(done) {
    agent.get('/example')
    .set('Accept-Version', '1.4.9')
    .expect(400, function (err, res) {
      if (err) { return done(err); }
      expect(res.body.message).to.equal('1.4.9 is not supported by GET /example');
      done();
    });
  });

});
