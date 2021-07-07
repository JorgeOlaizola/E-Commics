const { Schema, model } = require('mongoose');
const User = model('User');
const Product = model('Product');

const cartSchema = new Schema({
	user: {
        type: Schema.ObjectId, 
        ref: "User" 
    },
    product: {
        type: Schema.ObjectId, 
        ref: "Product" 
    },
    status: {
    	type: String,
    	default: String,
        required: true
    }
});

module.exports = model('Cart', cartSchema);