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
	followers: {
		type: String,
	},
	following: {
		type: String,
	},
	date :{
		type: String,
	}

})

module.exports = mongoose.model('User', userData)