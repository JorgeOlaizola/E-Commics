import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import Order from '../../../server/models/Order'
import User from '../../../server/models/User'

export default nextConnect()

.get( async(req, res) => {
    try {
        await dbConnect()

        const { eachCase, userId } = req.query

        if(eachCase === 'seller' || eachCase === 'buyer') {
            const Orders = await Order.find({}).where({ [eachCase]: userId })
            if(!Orders) return res.json({ error_msg: 'No se encontró nada'})
            await User.populate(Orders, { path: 'seller' })
            await User.populate(Orders, { path: 'buyer' })
        
            const result = Orders.map(Orders => {
            return {
                status: Orders.status,
                Payment: Orders.Payment,
                _id: Orders._id,
                MerchantOrder: Orders.MerchantOrder,
                products: Orders.products,
                buyer: {
                    _id: Orders.buyer._id,
                    nickname: Orders.buyer.nickname,
                    avatar: Orders.buyer.avatar,
                    name: Orders.buyer.name,
                    surname: Orders.buyer.surname
                },
                seller: {
                    _id: Orders.seller._id,
                    nickname: Orders.seller.nickname,
                    avatar: Orders.seller.avatar,
                    name: Orders.seller.name,
                    surname: Orders.seller.surname
                }
            }})
            return res.json(result)
        }
        else {
            return res.json({ error_msg: 'Parámetros inválidos' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.put( async(req, res) => {
    try{
        await dbConnect()

        const { orderId, status, userId} = req.body

        const order = await Order.findById(orderId).exec()
        console.log(userId, order.buyer)
        if(order.seller == userId && status === 'approved'){
            order.status = 'En proceso de entrega'
            await order.save()
            return res.json(order)
        }
        if(order.buyer == userId && status === 'En proceso de entrega'){
            order.status = 'Recibido'
            await order.save()
            return res.json(order)
        }
        return res.json({ error_msg: 'Algo salió mal' })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})