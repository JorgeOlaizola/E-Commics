const { Router } = require('express')
const User = require('../models/User');
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { 
    registerController,
    logIn,
    logOut,
    userInfo,
    favorites
    } = require('../controllers/users.controllers')
const {
    isAuthenticated
} = require('../config/auth')

const router = Router()


//Register
router.post('/signUp', registerController)

//LogIn
router.post('/logIn', async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            req.login(user, { session: false }, async (err) => {
                if(err) return next(err)
                console.log(user)
                if(!user) return res.json({ error_msg: 'Las credenciales son invalidas' })
                const body = { user }
                const token = jwt.sign({ body }, 'top_secret')
                return res.json({ token })
            })
        }
        catch (e) {
            return next(e)
        }
    }) (req, res, next)
})

router.get('/profile', passport.authenticate('jwt', { session: false}), (req, res, next) => {
    res.json({
        message: 'Logueado correctamente',
        user: req.user,
        token: req.query.secret_token,
    })
})
//LogOut
router.get('/logOut', logOut)

//Credenciales
router.get('/', isAuthenticated, userInfo)

//Favourites
router.post('/favorites', favorites)

module.exports = router;