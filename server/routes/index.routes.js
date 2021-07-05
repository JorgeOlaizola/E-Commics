const { Router } = require('express')

//Initializations 
const router = Router()

///////////////////// Routes /////////////////////////

//User Routes
router.use('/users', require('./user.routes.js'))

//Product Routes
router.use('/products', require('./product.routes.js'))

//Category Routes
router.use('/categories', require('./category.routes.js'))

module.exports = router;