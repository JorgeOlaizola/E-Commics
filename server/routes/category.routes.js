const { Router } = require('express')
const {categoriesController} = require('../controllers/categories.controllers') 

const router = Router()

router.get('/', categoriesController)

module.exports = router;