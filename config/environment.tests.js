'use strict';

function requireUncached(module){
  delete require.cache[require.resolve(module)];
  return require(module);
}

describe('environment configuration', function(){
  var config;
  it('should set process.env.NODE_ENV to "development" by default', function(){
    //"gulp test" sets process.env.NODE_ENV to 'test', so we need to override that
    delete process.env.NODE_ENV;
    config = requireUncached('./environment');
    expect(config.env).to.equal('development');
  });

  it('should set the appropriate variables for "production environment"', function(){
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_URL = 'postgres://asdf:aassddff@ec2-12-12-123-123-123.compute-1.amazonaws.com:1234/asdfasdfasdf';
    config = requireUncached('./environment');

    var expected = {
      env: 'production',
      port: 8080,
      postgres: {
        uri: 'postgres://asdf:aassddff@ec2-12-12-123-123-123.compute-1.amazonaws.com:1234/asdfasdfasdf'
      }
    };
    for (var key in expected) {
      expect(expected[key]).to.deep.equal(config[key]);
    }
  });

  it('should set the appropriate variables for "development environment"', function(){
    process.env.NODE_ENV = 'development';
    config = requireUncached('./environment');

    var expected = {
      env: 'development',
      port: 5101,
      postgres: {
        dbname: 'cdb_metadata_service_dev',
        username: 'cdb',
        password: null
      }
    };
    for (var key in expected) {
      expect(expected[key]).to.deep.equal(config[key]);
    }
  });

  it('should set the appropriate variables for "local test environment"', function(){
    process.env.NODE_ENV = 'test_local';
    config = requireUncached('./environment');

    var expected = {
      env: 'test_local',
      port: 5202,
      postgres: {
        dbname: 'cdb_metadata_service_test',
        username: 'cdb',
        password: null
      }
    };
    for (var key in expected) {
      expect(expected[key]).to.deep.equal(config[key]);
    }
  });

  it('should set the appropriate variables for "ci test environment"', function(){
    process.env.NODE_ENV = 'test_ci';
    config = requireUncached('./environment');

    var expected = {
      env: 'test_ci',
      port: 5202,
      postgres: {
        dbname: 'circle_test',
        username: 'ubuntu',
        password: null
      }
    };
    for (var key in expected) {
      expect(expected[key]).to.deep.equal(config[key]);
    }
  });

});
