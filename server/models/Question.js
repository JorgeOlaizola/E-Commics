const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	product : {
		type : Schema.ObjectId,
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

module.exports = model('Question', questionSchema);