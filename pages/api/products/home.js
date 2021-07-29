import Category from '../../../server/models/Category'
import Product from '../../../server/models/Product'
import User from '../../../server/models/User'
import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'

export default nextConnect()


.get(async(req,res)=>{
    try {
        await dbConnect()
        const { rating } = req.query
        let products
        if( rating ){
            products = await Product.find({ status: "active"}).sort({ rating: -1 })
        }
        else{
            products = await Product.find({ status: "active"})
        }
        await Category.populate(products, { path: 'category' })
        await User.populate(products, { path: 'user' })
        
        const ProductsTotal = products.map(products => {
            return {
                _id: products._id,
                title: products.title,
                description: products.description,
                image: products.image.includes("&&") ? products.image.split("&&") : [products.image],
                price: products.price,
                realprice: products.realprice,
                discount: products.discount,
                stock: products.stock,
                rating: products.rating || 0,
                user: {
                    _id: products.user._id,
                    nickname: products.user.nickname
                },
                category: {
                    _id: products.category._id,
                    title: products.category.title
                }
            }
        })
        let result; 
        if(!rating)  {
            result = ProductsTotal.slice(ProductsTotal.length -10, ProductsTotal.length)
            result.reverse()
        }else{
            result  = ProductsTotal.slice(0, 10)
        }
        return res.json(result)
    }

    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})