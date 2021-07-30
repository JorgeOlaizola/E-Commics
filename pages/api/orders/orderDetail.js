import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import Order from '../../../server/models/Order'
import User from '../../../server/models/User'
import Location from '../../../server/models/Location'

export default nextConnect()

.get( async(req, res) => {
    try{
        await dbConnect()

        const Orders = await Order.findById(req.query.orderId)
        await User.populate(Orders, { path: 'buyer' })
        await User.populate(Orders, { path: 'seller' })
        const sellerLocation = await Location.findById(Orders.seller.location).exec()
        const buyerLocation = await Location.findById(Orders.buyer.location).exec()
        const result = {
            status: Orders.status,
            Payment: Orders.Payment,
            _id: Orders._id,
            MerchantOrder: Orders.MerchantOrder,
            products: Orders.products.map(p => {
                return {
                    review: p.review,
                    _id: p._id,
                    unit_price: p.unit_price,
                    title: p.title,
                    quantity: p.quantity,
                    image: p.image
                }
            }),
            buyer: {
                _id: Orders.buyer._id,
                nickname: Orders.buyer.nickname,
                avatar: Orders.buyer.avatar,
                name: Orders.buyer.name,
                surname: Orders.buyer.surname,
                email: Orders.buyer.email,
                avatar: Orders.buyer.avatar,
                location: buyerLocation.location
            },
            seller: {
                _id: Orders.seller._id,
                nickname: Orders.seller.nickname,
                avatar: Orders.seller.avatar,
                name: Orders.seller.name,
                surname: Orders.seller.surname,
                email: Orders.seller.email,
                avatar: Orders.seller.avatar,
                location: sellerLocation.location
            }
        }
        return res.json(result)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})
