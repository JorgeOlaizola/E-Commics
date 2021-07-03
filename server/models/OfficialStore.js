const { Schema, model } = require('mongoose');

const officialStoreSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	name_store: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		default: String,
		required: true
	},
	banner: {
		type: String,
		default: String,
		required: true
	},
	rating: Number,
	location: String
});

module.exports = model('OfficialStore', officialStoreSchema);