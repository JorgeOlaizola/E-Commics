const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	product : {
		type : mongoose.Schema.ObjectId,
		ref: 'Product'
	},
	content: {
		type: String,
		required: true
	},
	answer: {
		type : String
	},
	created_at: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.models.Question || mongoose.model('Question', questionSchema);