import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import Order from '../../../server/models/Order'

export default nextConnect()

.get( async(req, res) => {
    try{
        await dbConnect()
        const order = await Order.findById(req.query.orderId)
        res.json(order)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})
