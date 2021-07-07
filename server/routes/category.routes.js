const { Router } = require('express')
const {
    categoriesController,
    addCategory
} = require('../controllers/categories.controllers')

const router = Router()

router.get('/', categoriesController)
router.post('/add', addCategory)  
module.exports = router;