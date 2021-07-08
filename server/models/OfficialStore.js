const { Schema, model } = require('mongoose');

const officialStoreSchema = new Schema({
	user: {
        type: Schema.ObjectId, 
        ref: "User" 
    },
    banner: {
		type: String,
		default: String,
		required: true
	},
	name_store: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true,
		default: Number
	},
	location: {
		type: String
	}
});

module.exports = model('OfficialStore', officialStoreSchema);