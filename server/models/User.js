const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		default: String
	},
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required: true
	},
	role: {
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
	},
	favorites: {
		type: [{
			productId: {
				type: String
			},
			productImg: {
				type: [String]
			},
			productTitle: {
				type: String
			},
			productPrice: {
				type: Number
			}
		 }]
	}
});

userSchema.methods.encryptPassword = async password => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
}

module.exports = model('User', userSchema);