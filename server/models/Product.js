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
	user: {
        type: Schema.ObjectId, 
        ref: "User" 
    },
    category: {
        type: Schema.ObjectId, 
        ref: "Category" 
    },
	stock: Number,
	price: Number,
	created_at: Date
});

module.exports = model('Product', productSchema);