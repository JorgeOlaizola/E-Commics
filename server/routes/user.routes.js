const { Router } = require('express')
const { 
    registerController,
    logIn,
    logOut
    } = require('../controllers/users.controllers')

const router = Router()


//Register
router.post('/signUp', registerController)

//LogIn
router.post('/logIn', logIn)

//LogOut
router.get('/logOut', logOut)

module.exports = router;