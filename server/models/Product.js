const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	user: {
        type: mongoose.Schema.ObjectId, 
        ref: "User" 
    },
    officialStore: {
        type: mongoose.Schema.ObjectId, 
        ref: "OfficialStore" 
    },
    category: {
        type: mongoose.Schema.ObjectId, 
        ref: "Category" 
    },
    question: {
        type: mongoose.Schema.ObjectId, 
        ref: "Question" 
    },
    review: {
        type: mongoose.Schema.ObjectId, 
        ref: "Review" 
    },
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
	stock: {
		type: Number,
		required: true
	},
	cart_Items: {
		type: Number,
	},
	price: {
		type: Number,
		required: true
	},
	created_at: {
		type: Date
	}
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);