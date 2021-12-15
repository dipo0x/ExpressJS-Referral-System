const mongoose = require('mongoose')

var userData= new mongoose.Schema({
	username: {
		type: String,
	},
	password: {
		type: String,
	},
	referralID: {
		type: String,
	},
    referralNO: {
		type: Number, default: 0
	},
	referral: {
		type: String,
	},
	referred: {
		type: String,
	},
	date :{
		type: String,
	}

})

module.exports = mongoose.model('User', userData)