const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.ObjectId, 
        ref: "User" 
    },
    seller: {
        type: mongoose.Schema.ObjectId, 
        ref: "User" 
    },
    products:[
        {
            _id:{
                type: mongoose.Schema.ObjectId,
                ref: "Product"
            },
            unit_price:Number,
            title:String,
            quantity: Number,
            image: [String],
            review: {
                type: String,
                default: 'NoReview'
            }
        }
    ],
    status:{
        type: String,
        default:"init",
        required: true
    },
    MerchantOrder: {
        type:String,
        default:""
    },
    Payment: {
        type:String,
        default:""
    },
    shipping:{
        street:String,
		location: String,
		number: String,
		info:String
    }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);