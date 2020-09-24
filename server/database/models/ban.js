const mongoose = require('mongoose');

const banSchema = new mongoose.Schema({
	td: { type: Date, default: Date.now },
	fkAccountId: mongoose.ObjectId, /* if any */
	email: String,
	reason: String,
	endDate: Date,
});

module.exports = mongoose.model('Ban', banSchema);
