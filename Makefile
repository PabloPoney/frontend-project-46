install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

testing:
	npm run test

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
	
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage