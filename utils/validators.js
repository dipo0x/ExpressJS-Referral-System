const userData = require('../models/users')
const validator = require('validator');

module.exports.signup = (email, username, password) => {
	const errors = {};
	if (!validator.isEmail(email)){
		errors["email"] = "Not a valid email address";
		}
	if(!validator.isAscii(password) === ''){
		errors["password"] = "Not a valid password";	
		}
	if(!validator.isLength(password, {min:4, max: 12})){
		errors["password"] = "Password ensure that your password has a minimum of 4 char and maximum of 12 char";	
	}

	userData.findOne({email: email}).then(user=>{
        if(user){
            errors["email_exists"] = "Email already in use"
            rerender_register(req, res, errors);
            }
        }
    )

	userData.findOne({username: username}).then(aUser=>{
		if(aUser){
			   errors["email_exists"] = "Username already in use"
			    }
			}
		)

    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}