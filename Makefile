.PHONY: \
	list \
	build \
	clean \
	deploy \
	lint \
	precommit \
	run/gateway \
	run/server/movies \
	run/server/ui-settings \
	start  \
	test \
	typecheck \
	zip

list:
	@$(MAKE) -pRrq -f $(lastword $(MAKEFILE_LIST)) : 2>/dev/null | awk -v RS= -F: '/^# File/,/^# Finished Make data base/ {if ($$1 !~ "^[#.]") {print $$1}}' | sort | egrep -v -e '^[^[:alnum:]]' -e '^$@$$'

build: clean
	npm run build

clean:
	rm -rf built 

deploy:
	aws s3 cp function.zip s3://my-movies-graphql-prod/function.zip

lint:
	npm run lint

precommit: typecheck lint test

run/gateway:
	npx ts-node ./src/gateway.ts

run/server/movies:
	npx ts-node ./src/movies/server.ts

run/server/ui-settings:
	npx ts-node ./src/ui-settings/server.ts

start:
	npm start

test:
	npm run test:ci

typecheck:
	npm run typecheck

zip:
	rm -f function.zip 
	zip -r function built node_modules


