'use strict';

var request = require('supertest');
var config  = require('../../config/environment');

describe('/api/employees', function(){
  var hostname = 'http://localhost:' + config.port;
  var boot = require('../../server.js').boot;
  var server;

  before(function(){
    server = boot(config.port);
    // TODO: populate test DB with sample data
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
    server.close();
  });

});
