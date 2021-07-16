const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
	token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId, 
        ref: "User" 
    }
}, { timestamps: true });

module.exports = mongoose.models.Token || mongoose.model('Token', tokenSchema);