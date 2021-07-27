import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import Product from '../../../server/models/Product'
import Review from '../../../server/models/Review'
import Order from '../../../server/models/Order'
import User from '../../../server/models/User'

export default nextConnect()

.post( async(req, res) => {
    try{
        await dbConnect()

        const { order, product, user, content, rating} = req.body

        if(!order) return res.json({ error_msg: 'Order required' })
        if(!product) return res.json({ error_msg: 'Product required' })
        if(!user) return res.json({ error_msg: 'User required' })
        if(!content) return res.json({ error_msg: 'Content required' })
        if(!rating) return res.json({ error_msg: 'Rating required' })

        const checkOrder = await Order.findById(order).exec()
        if(!checkOrder) return res.json({ error_msg: 'No se encontró la orden' })

        if(checkOrder.status !== 'Recibido') return res.json({ error_msg: 'Todavía no se puede dejar reviews en este producto ya que no se realizó la entrega' })
        const newReview = new Review({ user, content, rating, product })
        await newReview.save()
        return res.json(newReview)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.get( async(req, res) => {
    try{
        await dbConnect()

        const { productId } = req.query
        const productReviews = await Review.find({}).where({ product: productId }).exec()
        return res.json(productReviews)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})