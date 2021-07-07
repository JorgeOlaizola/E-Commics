const { Schema, model } = require('mongoose');
const User = model('User');
const OfficialStore = model('OfficialStore');
const Category = model('Category');
const Question = model('Question');
const Review = model('Review');

const productSchema = new Schema({
	user: {
        type: Schema.ObjectId, 
        ref: "User" 
    },
    officialStore: {
        type: Schema.ObjectId, 
        ref: "OfficialStore" 
    },
    category: {
        type: Schema.ObjectId, 
        ref: "Category" 
    },
    question: {
        type: Schema.ObjectId, 
        ref: "Question" 
    },
    review: {
        type: Schema.ObjectId, 
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
	}
	price: {
		type: Number,
		required: true
	},
	created_at: {
		type: Date
	}
});

module.exports = model('Product', productSchema);