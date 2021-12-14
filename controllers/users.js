const bcrypt = require('bcrypt')
const userData = require('../models/users')
const { signup } = require('../utils/validators')
const passport = require('passport')

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
    res.render('user/register',{referral_id: req.params.id});
}

exports.get_register = function(req, res, next) {
    res.render('user/register');
}

exports.register = async function(req, res, next) {
    const theUsername = req.body.username
    const theEmail = req.body.email
    const thePassword = req.body.password
    const theReferral = req.body.referral
    const newPassword = await bcrypt.hash(thePassword, 10)
    const date = new Date().toTimeString().split(" ")[0];
    const { errors, valid } = signup(theEmail, thePassword);
    var referral_error = {}

    userData.findOne({email: theEmail}).then(user=>{
        if(user){
            errors["email_exists"] = "Email already in use"
            rerender_register(req, res, errors);
            }
    }
    )
    userData.findOne({username: theUsername}).then(aUser=>{
        if(aUser){
            errors["email_exists"] = "Username already in use"
            rerender_register(req, res, errors);
        }})

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
                    email: theEmail,
                    password: newPassword,
                    referralID:  Math.floor(Math.random() * 10000000),
                    date: date
                })
                newUser.save().then(result=>{
                    res.render('index', {success:"Account Creation Successful"})
                })
            }
            else{
                let newUser = new userData({
                    username: theUsername,
                    email: theEmail,
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

const rerender_register = function(req, res, errors, referral_error) {
    res.render('user/register', {data: req.body, title: "Registration Page", referral_error, errors});
}

exports.profile = function(req, res) {
    userData.findOne({username : req.user.username}).then(user=>{
    res.render('user/profile', {user: user});
    }
    )}


exports.referral_register = async function(req, res, next) {
    const theUsername = req.body.username
    const theEmail = req.body.email
    const thePassword = req.body.password
    const newPassword = await bcrypt.hash(thePassword, 10)
    const date = new Date().toTimeString().split(" ")[0];
    const { errors, valid } = signup(theEmail, thePassword);
    var referral_error = {}

    userData.findOne({email: theEmail}).then(user=>{
        if(user){
            errors["email_exists"] = "Email already in use"
            rerender_register(req, res, errors);
            }
    }
    )
    userData.findOne({username: theUsername}).then(aUser=>{
        if(aUser){
            errors["email_exists"] = "Username already in use"
            rerender_register(req, res, errors);
        }})

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
                email: theEmail,
                password: newPassword,
                referralID:  Math.floor(Math.random() * 10000000),
                date: date
            })
            newUser.save().then(result=>{
                res.render('index', {success:"Account Creation Successful"})
            })
        }
        else{
            let newUser = new userData({
                username: theUsername,
                email: theEmail,
                password: newPassword,
                referralID:  Math.floor(Math.random() * 10000000),
                date: date
            })
            newUser.save().then(result=>{
                res.render('index', {success:"You have successfully created an account but user with that referral ID doesn't exist"});
            }
            )
        }
    })
    
}
