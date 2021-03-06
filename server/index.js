//environment variables
require('dotenv').config();

//setup the database
const { initializeDB } = require('./database');
initializeDB();

//network libraries
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app);

// Add body parser
app.use(bodyParser.json());

//add each route
app.use('/api', require('./routes/accounts'));

//TODO: more stuff goes here

//send compressed files
app.get('*.js*', (req, res, next) => {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/javascript');
	next();
});

app.get('*.css', (req, res, next) => {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	res.set('Content-Type', 'text/css');
	next();
});

//get the path library
const path = require('path');

//send static files
app.use('/', express.static(path.resolve(__dirname, '../public')));

//fallback to the index file
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, `../public/index.html`));
});

//startup
http.listen(process.env.WEB_PORT || 8080, (err) => {
	//eslint-disable-next-line no-console
	console.log(`listening to localhost:${process.env.WEB_PORT || 8080}`);
});
