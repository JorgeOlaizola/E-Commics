import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import Order from '../../../server/models/Order'

export default nextConnect()

.get( async(req, res) => {
    try {
        await dbConnect()

        const { eachCase, userId } = req.query

        if(eachCase === 'buyer') {
            const buyerOrders = await Order.find({}).where({ buyer: userId })
            return res.json(buyerOrders)
        }
        if(eachCase === 'seller') {
            const sellerOrders = await Order.find({}).where({ seller: userId })
            return res.json(sellerOrders)
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