const { Router } = require('express')
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
router.post('/logIn', logIn)

//LogOut
router.get('/logOut', logOut)

//Credenciales
router.get('/', isAuthenticated, userInfo)

//Favourites
router.post('/favorites', favorites)

module.exports = router;