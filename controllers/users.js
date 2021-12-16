const bcrypt = require('bcrypt')
const userData = require('../models/users')
const { signup } = require('../utils/validators')
const passport = require('passport')

const rerender_register = function(req, res, errors,referral_error) {
    res.render('user/register', {data: req.body, errors, referral_error});
}

const email_view = function(req, res, theErrors) {
    res.render('user/register', {data: req.body, theErrors});
}

exports.get_login = function(req, res) {
    res.render('user/login');
}

exports.login = function(req, res, next) {
    passport.authenticate('local',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
}

exports.get_referral_register = function(req, res, next) {
    res.render('user/register', {referral_id: req.params.id});
}

exports.get_register = function(req, res, next) {
    res.render('user/register');
}

exports.register = async function(req, res, next) {
    const theUsername = req.body.username
    const thePassword = req.body.password
    const theReferral = req.body.referral
    const newPassword = await bcrypt.hash(thePassword, 10)
    const date = new Date().toTimeString().split(" ")[0];
    const { errors, valid } = signup(theUsername, thePassword);
    var referral_error = {}
    
    userData.findOne({username: theUsername}).then(user=>{
		const theErrors = {};
        if(user !== null){
            theErrors["username_exists"] = "Username already in use"
            email_view(req, res, theErrors);
        }
        else{
            if(!valid){
                rerender_register(req, res, errors, referral_error);
            }
            userData.findOne({referralID : theReferral}).then(user=>{
                    if(user){
                        const newNo = (Number(user.referralNO) + 1)
                        user.referralNO = newNo
                        user.save();
                        const newUser = new userData({
                            username: theUsername,
                            password: newPassword,
                            referralID:  Math.floor(Math.random() * 10000000),
                            date: date,
                            referred: theReferral
                        })
                        newUser.save().then(result=>{
                            res.render('index', {success:"Account Creation Successful"})
                        })
                    }
                    else{
                        let newUser = new userData({
                            username: theUsername,
                            password: newPassword,
                            referralID:  Math.floor(Math.random() * 10000000),
                            date: date
                        })
                        newUser.save().then(result=>{
                            res.render('index', {success:"You have successfully created an account but user with that referral ID doesn't exist"});
                        })  
                    }
                }
            )
        }
	})
}

exports.profile = function(req, res) {
    userData.findOne({username : req.user.username}).then(user=>{
    res.render('user/profile', {user: user});
    }
)}

exports.referred = function(req, res) {
    userData.find({referred : req.user.referralID}).then(user=>{
    res.render('user/referred', {user:user});
})}

exports.user_profile = function(req, res) {
    userData.findOne({username : req.params.id}).then(user=>{
    res.render('user/user_profile', {user:user});
})}

exports.referral_register = async function(req, res, next) {
    const theUsername = req.body.username
    const thePassword = req.body.password
    const newPassword = await bcrypt.hash(thePassword, 10)
    const date = new Date().toTimeString().split(" ")[0];
    const referred = req.params.id
    const { errors, valid } = signup(theUsername, thePassword);
    var referral_error = {}
    
    userData.findOne({username: theUsername}).then(user=>{
		const theErrors = {};
        if(user !== null){
            theErrors["username_exists"] = "Username already in use"
            email_view(req, res, theErrors);
        }
        else{
            if(!valid){
                rerender_register(req, res, errors, referral_error);
            }
        
            userData.findOne({referralID : req.params.id}).then(user=>{
                if(user){
                    const newNo = (Number(user.referralNO) + 1)
                    user.referralNO = newNo
                    user.save();
                    const newUser = new userData({
                        username: theUsername,
                        password: newPassword,
                        referralID:  Math.floor(Math.random() * 10000000),
                        date: date,
                        referred: referred
                    })
                    newUser.save().then(result=>{
                        res.render('index', {success:"Account Creation Successful"})
                    })
                }
                else{
                    let newUser = new userData({
                        username: theUsername,
                        password: newPassword,
                        referralID:  Math.floor(Math.random() * 10000000),
                        date: date,
                    })
                    newUser.save().then(result=>{
                        res.render('index', {success:"You have successfully created an account but user with that referral ID doesn't exist"});
                        }
                    )
                }
            }
        )
    }}
)}

exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/')
}