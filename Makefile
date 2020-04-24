start:
	node app.js

setup:
	cp .env.dist .env
	npm install

test:
	node data/tester.js