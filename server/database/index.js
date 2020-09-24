const Account = require('./models/account.js');
const Ban = require('./models/ban.js');
const Recovery = require('./models/recovery.js');
const Session = require('./models/session.js');
const Signup = require('./models/signup.js');

const mongoose = require('mongoose');

const initializeDB = () => {
	mongoose.connect('mongodb://localhost/decadejam', {useNewUrlParser: true});

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'mongoDB connection error:'));

	db.once('open', () => {
		console.log('mongoDB initialized');
	});
};

module.exports = {
	initializeDB,

	Account,
	Ban,
	Recovery,
	Session,
	Signup,
}