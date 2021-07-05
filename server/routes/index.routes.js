const { Router } = require('express')

//Initializations 
const router = Router()

//Routes

//User Routes
const Users = require('./user.routes.js')
router.use('/users', Users)

//Product Routes
const Products = require('./product.routes.js')
router.use('/products', Products)

module.exports = router;