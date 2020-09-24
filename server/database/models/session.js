const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
	td: { type: Date, default: Date.now },
	fkAccountId: mongoose.ObjectId,
	token: String
});

module.exports = mongoose.model('Session', sessionSchema);
