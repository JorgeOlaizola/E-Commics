const { Router } = require('express')

//Initializations 
const router = Router()

//Routes

//User Routes
const Users = require('./user.routes.js')
router.use('/users', Users)


module.exports = router;