import { expect } from 'chai';
import request from 'supertest';

import config from '../../config/environment';
import { boot } from '../../server.js';

describe('/label', () => {
  const hostname = `http://localhost:${config.port}`;
  let testServer;

  before(done => {
    boot(config.port)
    .then(server => {
      testServer = server;
      done();
    });
  });

  describe('GET request to /label', () => {
    it('should return list of labels', done => {
      const expected = ['EMI', 'Columbia', 'Naxos'];

      request(hostname)
      .get('/label')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) { throw err; }
        const labels = JSON.parse(res.text);
        expect(labels).to.deep.equals(expected);
        done();
      });
    });
  });

  after(() => {
    testServer.close();
  });
});
