import dbConnect from "../../../utils/dbConnect";
import nextConnect from "next-connect";
import Product from "../../../server/models/Product";
import Category from '../../../server/models/Category'

export default nextConnect()

.get( async (req, res) => {
    try{
        await dbConnect()

        const { status, userId } = req.query
        
        let ownProducts = await Product.find({}).where({ status: status, user: userId})
        let withCategories = await Category.populate(ownProducts, { path: 'category' }) 
        withCategories = withCategories.map(p => {
            return {
                _id: p._id,
                title: p.title,
                category: p.category,
                price: p.price,
                status: p.status,
                image: p.image.includes("&&") ? p.image.split("&&") : [p.image]
            }
        })
        res.json({ ownProducts: withCategories})
        
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.put( async(req, res) => {
    try{
        await dbConnect()

        const { productId, status } = req.body

        const productUpdate = await Product.findByIdAndUpdate(productId, { status: status })
        return res.json(productUpdate)

    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})