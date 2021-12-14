// const userData = require('./models/users')
// let LocalStrategy = require('passport-local').Strategy;
// let bcyrpt = require('bcrypt')

// const validPassword = function(user, password){
//     return bcyrpt.compareSync(password, user.password);
// }

// module.exports = function(passport){
//     passport.serializeUser(function(user, done){
//         done(null, user.id)
//     });
//     passport.deserializeUser(function(id, done){
//         userData.findOne({ id: id }).then(user=>{
//             if (user == null){
//                 done(new Error("Wrong user ID"))
//             }
//             done(null, user);
//         })
//     })
//     passport.use(new LocalStrategy({
//         usernameField: 'email',
//         passwordField : 'password',
//         passReqToCallback: true
//     },
//     function(req, email, password, done){
//         return userData.findOne({ email: email}).then(user=>{
//             console.log(user)
//             if (user.length==0){
//                 req.flash('message', 'Incorrect email')
//                 return done(null, false)
//             }
//             else if(user.password == null || user.password == undefined){
//                 req.flash('message', 'You must reset your password')
//                 return done(null, false)
//             }
//             else if(!validPassword(user, req.body.password)){
//                 req.flash('message', 'Incorrect password')
//                 return done(null, false)
//             }
//             return done(null, user)
//         }).catch(err => {
//             done(err, false)
//         })
//     }))
// }    

const userData = require('./models/users')
let LocalStrategy = require('passport-local').Strategy;
let bcyrpt = require('bcrypt')

const validPassword = function(user, password){
    return bcyrpt.compareSync(password, user.password);
}

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id)
    });
    passport.deserializeUser(function(id, done){
        userData.findOne({ id: id }).then(user=>{
            if (user == null){
                done(new Error("Wrong user ID"))
            }
            done(null, user);
        })
    })
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField : 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        return userData.findOne({ email: email}).then(user=>{
            const errors = {}
            if (user.length==0){
                errors["email"] = 'Incorrect email'
                return done(null, false, errors, { isValid: Object.keys(errors).length < 1})
            }
            else if(!validPassword(user, req.body.password)){
                errors["password"] = "Incorrect password"
                return done(null, false, errors, { isValid: Object.keys(errors).length < 1})
            }
            return done(null, user)
        }).catch(err => {
            done(err, false)
        })
    }))
}    