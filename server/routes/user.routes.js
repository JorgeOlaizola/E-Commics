const { Router } = require('express')
const { 
    registerController,
    logIn
    } = require('../controllers/users.controllers')

const router = Router()

router.post('/', registerController)

router.get('/logIn', logIn)

module.exports = router;