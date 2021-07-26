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
	},
	status: {
		type: String,
		required: true,
		default: 'active'
	}
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);