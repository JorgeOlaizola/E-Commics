import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import Order from '../../../server/models/Order'
import User from '../../../server/models/User'

export default nextConnect()

.get( async(req, res) => {
    try {
        await dbConnect()

        const { eachCase, userId, filter } = req.query

        if(eachCase === 'seller' || eachCase === 'buyer') {
            let Orders 
            if(filter !== '') {
                Orders = await Order.find({}).where({ status: filter, [eachCase]: userId }).exec()
            }
            else {
                Orders = await Order.find({}).where({ [eachCase]: userId }).exec()
            }

            if(!Orders) return res.json({ error_msg: 'No se encontró nada'})

            await User.populate(Orders, { path: 'seller' })
            await User.populate(Orders, { path: 'buyer' })
        
            let result = Orders.map(Orders => {
            return {
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
            if(filter === 'Finalizado'){
                return res.json(result)
            }
            else {
                result = result.filter(r => {
                    return r.status !== 'Finalizado'
                })
                return res.json(result)
            }
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

        const { orderId, status, userId } = req.body

        const order = await Order.findById(orderId).exec()
        if(order.seller == userId && status === 'Pago realizado'){
            order.status = 'En proceso de entrega'
            await order.save()

            //---BUYER NOTIFICATION
            const buyer = await User.findById(order.buyer).exec()
            const seller = await User.findById(order.seller).exec()
            if(buyer){
                const notification = {
                    img: 'https://res.cloudinary.com/jorgeleandroolaizola/image/upload/v1627517096/Notifications%20eccomics/despachar_poyzma.png',
                    content: `${seller.nickname} despachó tu pedido. No te olvides de avisar una vez que lo recibas!`,
                    link: `/orderDetail/${order._id}`
                }
                buyer.notifications.unshift(notification)
                if(buyer.notifications.length > 5){
                    buyer.notifications.pop()
                }

                await buyer.save()
            }
            //--RESPONSE
            return res.json(order)
        }
        if(order.buyer == userId && status === 'En proceso de entrega'){
            order.status = 'Recibido'
            await order.save()

            //--SELLER NOTIFICATION
            const buyer = await User.findById(order.buyer).exec()
            const seller = await User.findById(order.seller).exec()
            if(seller){
                const notification = {
                    img: 'https://res.cloudinary.com/jorgeleandroolaizola/image/upload/v1627517096/Notifications%20eccomics/recibir_producto_ulqiop.png',
                    content: `${buyer.nickname} recibió tu pedido. Gracias por confiar en E-Commics.`,
                    link: `/orderDetail/${order._id}`
                }
                seller.notifications.unshift(notification)
                if(seller.notifications.length > 5){
                    seller.notifications.pop()
                }

                await seller.save()
            }
            //--RESPONSE
            return res.json(order)
        }
        return res.json({ error_msg: 'Algo salió mal' })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})