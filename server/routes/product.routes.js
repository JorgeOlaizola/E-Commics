const { Router } = require('express')
const { 
    createProduct,
    getProducts,
    getProductDetail,
    deleteProduct
} = require('../controllers/products.controllers')
const router = Router()

router.post('/', createProduct)
router.get('/product', getProductDetail)
router.delete('/product', deleteProduct)
router.post('/get', getProducts)

module.exports = router;