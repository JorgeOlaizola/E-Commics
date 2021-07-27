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
	product: {
		type: Schema.ObjectId,
		ref: 'Product'
	},
	created_at: Date
});

module.exports = model('Review', reviewSchema);