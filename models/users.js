const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var userData= new mongoose.Schema({
	username: {
		type: String,
	},
	password: {
		type: String,
	},
	////user's referral ID
	referralID: {
		type: String,
	},
	//number of folks yve referred 
    referralNO: {
		type: Number, default: 0
	},
	////the id of the person who referred you
	referral: {
		type: String,
	},
	////those you have referred
	referred: {
		type: String,
	},
	date :{
		type: String,
	}

})

module.exports = mongoose.model('User', userData)


module.exports.comparePassword = (candidatePassword, hash, callback)=>{
	bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
		if(err) return callback(err)
		callback(null, isMatch)
	})
}