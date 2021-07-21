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