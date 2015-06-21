'use strict';

var argv = require('yargs').argv;
var gulp  = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
// var debug = require('gulp-debug');

var paths = {
  'src': ['./+(api|config)/**/!(*.tests.*)*.js'],
  'tests': [
    './**/*.tests.js',
    '!node_modules/**/*'
  ]
};

gulp.task('test', function() {
  // Make Chai and extensions available for all unit tests
  var chai = require('chai');
  var sinonChai = require('sinon-chai');
  var chaiAsPromised = require('chai-as-promised');
  chai.use(sinonChai);
  chai.use(chaiAsPromised);
  global.expect = chai.expect;

  // if gulp task is invoked with commandline arguments
  // eg. $ gulp task --files='./config/versioning.tests.js'
  var test_paths = {};
  if (argv.files) {
    test_paths.src = '';
    test_paths.tests = argv.files;
  }

  return gulp.src(test_paths.src || paths.src)
  // .pipe(debug())
  .pipe(istanbul({
    includeUntested: !test_paths.tests
  }))
  .pipe(istanbul.hookRequire())
  .on('finish', function() {
    return gulp.src(test_paths.tests || paths.tests)
    // .pipe(debug())
    .pipe(mocha({
      reporter: 'spec'
    }))
    .pipe(istanbul.writeReports({
      reporters: ['text', 'text-summary', 'json', 'lcov'],  // list of istanbul reporters
    }));
  });
});
