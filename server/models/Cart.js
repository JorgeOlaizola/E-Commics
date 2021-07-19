const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	user: {
        type: mongoose.Schema.ObjectId, 
        ref: "User" 
    },
    orders:{
        type: [
            {
                _id: {
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
                        stock: Number
                    }
                ],
                status:{
                    type: String,
                    default:"init",
                    required: true
                }
            }
        ]
    },
    status: {
        type: String,
        default: "init",
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

module.exports = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
