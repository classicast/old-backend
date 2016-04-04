import { expect } from 'chai';
import request from 'supertest';

import config from '../../config/environment';
import { boot } from '../../server.js';

import db from '../../config/database';
const { Label } = db;

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
    before(done => {
      Label.sync({ force: true }).then(() =>
        Label.bulkCreate([
          {
            label_name: 'EMI',
            label_defunct_date: null,
            label_country: null,
          },
          {
            label_name: 'COLUMBIA',
            label_defunct_date: null,
            label_country: null,
          },
        ])
      ).then(() => done());
    });

    after(done => {
      Label.sync({ force: true }).then(() => done());
    });

    it('should return list of labels', done => {
      const expected = [
        {
          id: 1,
          label_name: 'EMI',
          label_defunct_date: null,
          label_country: null,
        },
        {
          id: 2,
          label_name: 'COLUMBIA',
          label_defunct_date: null,
          label_country: null,
        },
      ];

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
