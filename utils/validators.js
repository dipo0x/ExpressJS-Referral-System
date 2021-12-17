const validator = require('validator');

module.exports.signup = (username, password) => {
	const errors = {};
	if (username === ''){
		errors["username"] = "Your username is blank you wan create account, who you one impress 😂😂😭😭😒";
		}
	if(!validator.isAscii(password)){
		errors["password"] = "Not a valid password";	
		}
	if(!validator.isLength(password, {min:4, max: 12})){
		errors["password"] = "Password ensure that your password has a minimum of 4 char and maximum of 12 char";	
	}
    return{
        errors,
        valid: Object.keys(errors).length < 1
    }
}


module.exports.luhnAlgo  = num => {
	const referralIDError = {};
	if(num % 2 != 0){
		referralIDError["luhnAlgo"] = "Not a valid Referral ID";	
	}
	return{
        referralIDError,
        referralValid: Object.keys(referralIDError).length < 1
    }
  };
