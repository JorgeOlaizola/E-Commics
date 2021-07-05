const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    //Match user's email
    const MatchEmail = await User.findOne({ email })
    if(!MatchEmail){
        return done(null, false, { message: 'El email no se encuentra registrado' })
    }
    else {
        //Match user´s password
        const MatchPassword = await User.matchPassword(password)
        if (MatchPassword) {
            return (null, user)
        }
        else {
            return (null, false, { message: 'La contraseña es incorrecta' })
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})