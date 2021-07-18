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
            quantity: Number
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
    }
});

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);