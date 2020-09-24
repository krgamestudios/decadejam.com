const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
	td: { type: Date, default: Date.now },
	email: String,
	username: String,
	hash: String,
	token: String
});

module.exports = mongoose.model('Signup', signupSchema);
