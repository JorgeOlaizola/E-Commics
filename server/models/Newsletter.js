const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String, 
        required: true
    },
    author: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    } 
});

module.exports = mongoose.models.Newsletter || mongoose.model('Newsletter', newsletterSchema);