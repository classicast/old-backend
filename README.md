ClassicalDB Metadata Service
=============================

[![Circle CI](https://circleci.com/gh/classicalmusic/api.classicaldb.org.svg?style=shield)](https://circleci.com/gh/classicalmusic/api.classicaldb.org)
[![Coverage Status](https://coveralls.io/repos/github/classicalmusic/api.classicaldb.org/badge.svg?branch=master)](https://coveralls.io/github/classicalmusic/api.classicaldb.org?branch=master)
[![Dependency Checker](https://david-dm.org/classicalmusic/api.classicaldb.org.svg)](https://david-dm.org/classicalmusic/api.classicaldb.org?branch=master)


**Available Automation Tasks**

* To Run All Unit Tests: `make test`

* To Run Specific Unit Test(s): `make test TESTS="<glob, eg: ./**/sample.tests.js>"`

* To Run Linter: `make lint`

* To Open Coverage Report: `make report`


**Developer Setup**
* Node version management: Make sure you have [avn](https://www.npmjs.com/package/avn) and [nvm](https://www.npmjs.com/package/nvm) installed and configured:
`npm install -g nvm avn avn-nvm`
`avn setup`
`nvm install v4.1.0`
* Global Command Line Utilities
  * `npm install -g eslint` (for native editor linting)
* Install postgres app (http://postgresapp.com/)

### License
ClassicalDB Metadata Service is licensed under the [MIT license](https://github.com/classicalmusic/classicaldb-service-metadata/blob/master/LICENSE)

Copyright &copy; 2016 Andrew Zey