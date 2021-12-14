const mongoose = require('mongoose')

module.exports = ()=>{
    mongoose.connect('mongodb+srv://Ogeneral2006:Ogeneral2006@cluster0.98ez5.mongodb.net/ReferralAPP?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
	if (!err){console.log('MongoDB connected')}
	else {console.log('Error : ' + err)}
    })}