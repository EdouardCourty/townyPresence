start:
	node app.js

setup:
	cp .env.dist .env
	cp ./config/whitelist.json.dist ./config/whitelist.json
	npm install

test:
	node data/tester.js