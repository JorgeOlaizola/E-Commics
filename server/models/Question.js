const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
	description: {
		type: String,
		required: true
	}
});

module.exports = model('Question', questionSchema);