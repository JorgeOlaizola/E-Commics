const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	content: {
		type: String,
		required: true
	},
	rating: {
		type: Number
	},
	created_at: Date
});

module.exports = model('Review', reviewSchema);