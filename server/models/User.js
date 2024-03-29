const mongoose = require('mongoose');

const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
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
	discount:{
		percentage:{
			type:Number,
			default:0
		},
		date:{
			type: Date,
			default: new Date()
		}
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
        type: mongoose.Schema.ObjectId, 
        ref: "Location" 
    },
	street: {
		type: String
	},
	cellphone: {
		type: String
	},
	favorites: [{
		type: mongoose.Schema.ObjectId, 
        ref: "Product" 
	}],
	status: {
		type: String,
		required: true
	},
	github: {
		type: String,
		default: 'None'
	},
	shipping:[{
		street:String,
		location: String,
		number: String,
		info:String
	}],
	notifications:[{
		content:String, 
		img:String, 
		link:String
	}]
});

userSchema.methods.encryptPassword = async password => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
}

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
}


module.exports = mongoose.models.User || mongoose.model('User', userSchema);