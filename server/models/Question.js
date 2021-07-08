const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	product : {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	answer: {
		type: String
	},
	created_at: Date
});

module.exports = model('Question', questionSchema);