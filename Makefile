BIN = node_modules/.bin

TESTS ?= "**/*.tests.js"
SRC_FILES ?= "{server,index,{api,config}/**/*}.js"

NODE_ENV ?= development

lint:
	$(BIN)/eslint $(SRC_FILES)


## Run all Tests and Generate Coverage Report
#    `make test` will invoke all tests

## Run specified tests and generate coverage report
#    `make test TESTS="./**/label.tests.js"`

test:
	$(BIN)/istanbul cover $(BIN)/_mocha -x $(TESTS) -- \
	--compilers js:babel-register --reporter dot $(TESTS)

## Open the html report in the system default browser
report:
	open ./coverage/lcov-report/index.html

## Send the coverage information to coveralls
coveralls:
	cat ./coverage/lcov.info | $(BIN)/coveralls


## Make a new migration file
migrate-new:
	$(BIN)/sequelize migration:create


## Run any migrations that haven't been run yet
migrate:
	$(BIN)/sequelize db:migrate --config config/databaseConfig.json --env=$(NODE_ENV)


.PHONY: lint test report coveralls coverage migrate-new migrate