'use strict';

import chai, { expect } from 'chai';

var request = require('supertest');
var config  = require('../../config/environment');

describe('/label', function(){
  var hostname = 'http://localhost:' + config.port;
  var boot = require('../../server.js').boot;
  var test_server;

  before(function(done){
    boot(config.port)
    .then(function(server) {
      test_server = server;
      done();
    });
  });

  describe('GET request to /label', function() {

    it('should return list of labels', function(done) {
      var expected = ['EMI', 'Columbia', 'Naxos'];

      request(hostname)
      .get('/label')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){ throw err; }
        var labels = JSON.parse(res.text);
        expect(labels).to.deep.equals(expected);
        done();
      });
    });
  });

  after(function(){
    test_server.close();
  });

});
