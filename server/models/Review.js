const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
	description: {
		type: String,
		required: true
	}
});

module.exports = model('Review', reviewSchema);