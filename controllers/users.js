const bcrypt = require('bcrypt')
const userData = require('../models/users')
const { signup } = require('../utils/validators')
const passport = require('passport')
const createError = require('http-errors');

const rerender_register = function(req, res, errors, referral_error) {
    console.log("My gee 111")
    res.render('user/register', {data: req.body, referral_error, errors});
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
    const theEmail = req.body.email
    const thePassword = req.body.password
    const theReferral = req.body.referral
    const newPassword = await bcrypt.hash(thePassword, 10)
    const date = new Date().toTimeString().split(" ")[0];
    const { errors, valid } = signup(theEmail, theUsername, thePassword);
    var referral_error = {}

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
    const { errors, valid } = signup(theEmail, theUsername, thePassword);
    var referral_error = {}
   
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
