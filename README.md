ClassicalDB Metadata Service
=============================

[![Circle CI](https://img.shields.io/circleci/project/classicalmusic/classicaldb-service-metadata/master.svg)](https://circleci.com/gh/classicalmusic/classicaldb-service-metadata?branch=master)
[![Coverage Status](https://img.shields.io/coveralls/classicalmusic/classicaldb-service-metadata/master.svg)](https://coveralls.io/r/classicalmusic/classicaldb-service-metadata?branch=master)
[![Dependency Checker](http://img.shields.io/david/classicalmusic/classicaldb-service-metadata.svg)](https://david-dm.org/classicalmusic/classicaldb-service-metadata?branch=master)


**Available Automation Tasks**

* To Run All Unit Tests: `gulp test`

* To Run Specific Unit Test(s): `gulp test --files="<GLOB>"`

* To Run Linter: `gulp lint`

* To Open Coverage Report: `gulp coverage`


**Developer Setup**
* Node version management: Make sure you have [avn](https://www.npmjs.com/package/avn) and [nvm](https://www.npmjs.com/package/nvm) installed and configured:
`npm install -g nvm avn avn-nvm`
`avn setup`
`nvm install v4.1.0`
* Global Command Line Utilities
  * `npm install -g gulp`
  * `npm install -g eslint eslint-plugin-react` (for native editor linting)

### License
ClassicalDB Metadata Service is licensed under the [MIT license](https://github.com/classicalmusic/classicaldb-service-metadata/blob/master/LICENSE)

Copyright (c) 2015 Andrew Zey