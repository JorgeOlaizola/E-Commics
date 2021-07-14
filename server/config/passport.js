const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// const options = {
//     jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: 'secret',
//     algorithms: ['RS256']
// }

// const strategy = new JwtStrategy(options, (payload, done) => {
//     //Match user's email
//     User.findOne({ _id: payload.sub })
//         .then((user) => {
//             if(user){
//                 return done(null, user)
//             } else {
//                 return done (null, false)
//             }
//         })
//         .catch((err) => {
//             done(err, null)
//         })
// }); 

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //Match user's email
    try{
        const user = await User.findOne({ email })
        if(!user){
            return done(null, false, { message: 'El usuario no existe' })
        }
        //Match user´s password
        const match = await user.matchPassword(password)
        if (match) {
            return done(null, user)
        }
        else {
            return done(null, false, { message: 'La contraseña es incorrecta' })
        }
    }
    catch (e) {
        return done(e)
    }
}));

passport.use(new JwtStrategy({
    secretOrKey: 'top_secret',
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    }
    catch(e) {
        done(error)
    }
}))

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// });

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         done(err, user)
//     })
// });
