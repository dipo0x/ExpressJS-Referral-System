import { connect } from 'mongoose'

export default ()=>{
    connect('mongodb+srv://<dbname>:<dbpassword>@cluster0.98ez5.mongodb.net/ReferralAPP?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
	if (!err){console.log('MongoDB connected')}
	else {console.log('Error : ' + err)}
    })}