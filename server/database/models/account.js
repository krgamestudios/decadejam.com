const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
	td: { type: Date, default: Date.now },
	email: String,
	username: String,
	hash: String,
	accountType: String,
	deletionTime: Date
});

module.exports = mongoose.model('Account', accountSchema);
