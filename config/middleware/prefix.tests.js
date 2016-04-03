import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
chai.use(dirtyChai);
chai.use(sinonChai);
import sinon from 'sinon';

import { BadRequestError } from 'restify';
import prefix from './prefix';

describe('prefix middleware', () => {
  let next;

  beforeEach(() => {
    next = sinon.spy();
  });

  it('should be a function', () => {
    expect(typeof prefix).to.equal('function');
  });

  it('should return a function as middleware', () => {
    expect(typeof prefix({ prefix: '/foo' })).to.equal('function');
  });

  it('should do nothing when not passed a prefix', () => {
    const req = { url: '/foo' };
    const cachedReq = Object.assign({}, req);
    prefix()(req, null, next);
    expect(req).to.deep.equal(cachedReq);
    expect(next).to.have.been.calledOnce();
    expect(next.calledWithExactly()).to.be.true();
  });

  it("should return an error when request URI doesn't begin with prefix", () => {
    const req = { url: '/foo' };
    prefix({ prefix: '/api' })(req, null, next);
    expect(next).to.have.been.calledOnce();
    expect(next).to.have.been.calledWith(
      new BadRequestError('API requests must begin with "api": /api/<version[optional]>/<resource>')
    );
    expect(next.args[0][0] instanceof BadRequestError).to.be.true();
  });

  it('should remove prefix from request url for requests with valid prefixed urls', () => {
    const req = { url: '/api/foo' };
    prefix({ prefix: '/api' })(req, null, next);
    expect(req.url).to.equal('/foo');
    expect(next).to.have.been.calledOnce();
    expect(next.calledWithExactly()).to.be.true();
  });
});
