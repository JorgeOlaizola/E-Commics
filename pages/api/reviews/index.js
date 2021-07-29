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

        const { order, product, user, content, rating } = req.body

        //---CONTENT REQUEST HANDLER
        if(!order) return res.json({ error_msg: 'Order required' })
        if(!product) return res.json({ error_msg: 'Product required' })
        if(!user) return res.json({ error_msg: 'User required' })
        if(!content) return res.json({ error_msg: 'Content required' })
        if(!rating) return res.json({ error_msg: 'Rating required' })

        //---SEARCHING ORDER AND SETTING ERRORS
        let checkOrder = await Order.findById(order)

        if(!checkOrder) return res.json({ error_msg: 'No se encontró la orden' })
        if(checkOrder.status !== 'Recibido') return res.json({ error_msg: 'Todavía no se puede dejar reviews en este producto ya que no se realizó la entrega' })
        
        //---CREATING REVIEW
        await Review.create({ user, content, rating, product })

        //--CHANGING PRODUCT STATUS IN ORDER
        checkOrder.products = checkOrder.products.map(p => {
            if( parseInt(p._id) === parseInt(product)){
                p.review = 'Review'
                return p
            }
            return p
        })

        //---CHANGING PRODUCT RATING
        const productRating = await Product.findById(product)
        const reviewsAmount = await Review.find({}).where({ product: product}).exec()
        productRating.rating = 0
        reviewsAmount.map(r => {
            productRating.rating  += r.rating
        })
        productRating.rating = productRating.rating / reviewsAmount.length
        
        await Product.findByIdAndUpdate(product, { rating: productRating.rating})

        //---SELLER NOTIFICATION
        const buyer = await User.findById(user).exec()
        const seller = await User.findById(order.seller).exec()
        if(seller){
            const notification = {
                img: 'https://res.cloudinary.com/jorgeleandroolaizola/image/upload/v1627517096/Notifications%20eccomics/review_e1ps4b.png',
                content: `${buyer.nickname} dejó una reseña en tu producto ${productRating.title} `,
                link: `/detail/${product}`
            }
            seller.notifications.unshift(notification)
            if(seller.notifications.length > 5){
                 seller.notifications.pop()
            }
        
            await seller.save()
        }

        
        //---CHANGING ORDER STATUS IF NECESSARY
        let checkStatus = checkOrder.products.filter(p => p.review !== 'Review')
        if(!checkStatus.length){
            checkOrder.status = 'Finalizado'
        }
        await checkOrder.save()

        //---RESPONSE
        return res.json({ success_msg: checkOrder.status})
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