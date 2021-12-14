const mongoose = require('mongoose')

var postData= new mongoose.Schema({
    title: {
		type: String,
	},
	content: {
		type: String,
	},
	owner: {
		type: String,
	},
    available: {
        type: Boolean
    },
    date:{
        type: String
    },
    likes:{
        type: Number
    },
    users:{
        type: String
    }
})

module.exports = mongoose.model('post', postData)