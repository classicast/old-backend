'use strict';

import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

var restify = require('restify');
var sinon = require('sinon');
var prefix = require('./prefix');
var assign = require('object-assign');

describe('prefix middleware', function () {
  var next;

  beforeEach(function () {
    next = sinon.spy();
  });

  it('should be a function', function () {
    expect(typeof prefix).to.equal('function');
  });

  it('should return a function as middleware', function () {
    expect(typeof prefix({ prefix: '/foo' })).to.equal('function');
  });

  it('should do nothing when not passed a prefix', function() {
    var req = { url: '/foo' };
    var cachedReq = assign({}, req);
    prefix()(req, null, next);
    expect(req).to.deep.equal(cachedReq);
    expect(next).to.have.been.calledOnce;
    expect(next.calledWithExactly()).to.be.true;
  });

  it("should return an error when request URI doesn't begin with prefix", function () {
    var req = { url: '/foo' };
    prefix({prefix: '/api'})(req, null, next);
    expect(next).to.have.been.calledOnce;
    expect(next).to.have.been.calledWith(new restify.BadRequestError('API requests must begin with "api": /api/<version[optional]>/<resource>'));
    expect(next.args[0][0] instanceof restify.BadRequestError).to.be.true;
  });

  it('should remove prefix from request url for requests with valid prefixed urls', function () {
    var req = { url: '/api/foo' };
    prefix({prefix: '/api'})(req, null, next);
    expect(req.url).to.equal('/foo');
    expect(next).to.have.been.calledOnce;
    expect(next.calledWithExactly()).to.be.true;
  });
});
