import { expect } from 'chai';

function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module);
}

describe('environment configuration', () => {
  let cachedNodeEnv;
  let config;

  before(() => {
    cachedNodeEnv = process.env.NODE_ENV;
  });

  after(() => {
    process.env.NODE_ENV = cachedNodeEnv;
    delete require.cache[require.resolve('./environment')];
  });

  it('should set process.env.NODE_ENV to "development" by default', () => {
    // "gulp test" sets process.env.NODE_ENV to 'test', so we need to override that
    delete process.env.NODE_ENV;
    config = requireUncached('./environment').default;
    expect(config.env).to.equal('development');
  });

  it('should set the appropriate variables for "production environment"', () => {
    process.env.NODE_ENV = 'production';
    process.env.DATABASE_URL = 'postgres://asdf:aassddff@ec2-12-12-123-123-123.compute-1.amazonaws.com:1234/asdfasdfasdf';
    config = requireUncached('./environment').default;

    const expected = {
      env: 'production',
      port: 8080,
      postgres: {
        uri: 'postgres://asdf:aassddff@ec2-12-12-123-123-123.compute-1.amazonaws.com:1234/asdfasdfasdf',
      },
    };
    Object.keys(expected).forEach(key =>
      expect(expected[key]).to.deep.equal(config[key])
    );
  });

  it('should set the appropriate variables for "development environment"', () => {
    process.env.NODE_ENV = 'development';
    config = requireUncached('./environment').default;

    const expected = {
      env: 'development',
      port: 5101,
      postgres: {
        dbname: 'cdb_metadata_service_dev',
        username: 'cdb',
        password: null,
      },
    };
    Object.keys(expected).forEach(key =>
      expect(expected[key]).to.deep.equal(config[key])
    );
  });

  it('should set the appropriate variables for "local test environment"', () => {
    process.env.NODE_ENV = 'test_local';
    config = requireUncached('./environment').default;

    const expected = {
      env: 'test_local',
      port: 5202,
      postgres: {
        dbname: 'cdb_metadata_service_test',
        username: 'cdb',
        password: null,
      },
    };
    Object.keys(expected).forEach(key =>
      expect(expected[key]).to.deep.equal(config[key])
    );
  });

  it('should set the appropriate variables for "ci test environment"', () => {
    process.env.NODE_ENV = 'test_ci';
    config = requireUncached('./environment').default;

    const expected = {
      env: 'test_ci',
      port: 5202,
      postgres: {
        dbname: 'circle_test',
        username: 'ubuntu',
        password: null,
      },
    };
    Object.keys(expected).forEach(key =>
      expect(expected[key]).to.deep.equal(config[key])
    );
  });
});
