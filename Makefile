start:
	node app.js

setup:
	cp .env.dist .env
	cp ./config/serverlist.json.dist ./config/serverlist.json
	npm install

test:
	node data/tester.js