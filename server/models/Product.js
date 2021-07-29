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
	created_at: {
		type: Date
	},
	status: {
		type: String,
		required: true,
		default: 'active'
	},
	realprice:{
		type: Number,
		required: true,
	},
	discount:{
		type: Number,
		required:true,
		default:0
	},
	price: {
		type:Number
	},
	rating: {
		type: Number,
		required: true,
		default: 0
	}
});

productSchema.methods.applyDiscount = (realPrice, discount) => {
    return realPrice - ((realPrice / 100) * discount)
}

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);


/*
price => realPrice - ((realPrice % 100 ) * discount)
realPrice => 2500
discunt => 0



*/