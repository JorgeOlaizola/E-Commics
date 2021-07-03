const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	image: {
		type: String,
		default: String,
		required: true
	},
	stock: Number,
	price: Number,
	created_at: Date
});

module.exports = model('Product', productSchema);