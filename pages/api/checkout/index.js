import nextConnect from 'next-connect'
import Cart from '../../../server/models/Cart';
import dbConnect from '../../../utils/dbConnect'
import Order from '../../../server/models/Order'
import Product from '../../../server/models/Product'
import User from '../../../server/models/User'
import { sendFailureEmail, sendBuyConfirmation, sendBuyPending } from '../../../utils/emailService'

const mercadopago = require('mercadopago');

const ABSOLUTE_URL = process.env.ABSOLUTE_URL
mercadopago.configure({
    access_token: 'APP_USR-2393330903375761-071320-cef66732946fab7378373774538693b7-790658216'
});
export default nextConnect()

    .post(async (req, res) => {
        const { id } = req.query;
        const { shippingInfo } = req.body
        console.log(shippingInfo)
        try {
            await dbConnect()
            let items = [];
            let total = 0
            let newShipping = {
                street: shippingInfo.calle,
                location: shippingInfo.localidad,
                number: `Numero: ${shippingInfo.numero} Piso: ${shippingInfo.piso} Departamento: ${shippingInfo.depto} CP: ${shippingInfo.cp}`,
                info: shippingInfo.info
            }
            const cart = await Cart.findById(id).exec()
            if (!cart) return res.json({ error_msg: "No existe un carrito con el id proporcionado" })
            cart.orders.forEach((or) => {
                items = items.concat(or.products)
            })
            items.forEach((p) => {
                total += p.unit_price
            })
            const userData = await User.findById(cart.user)
            cart.shipping = newShipping
            userData.shipping.push(newShipping)
            await userData.save()
            await cart.save()
            let discount = {
                title: "discount",
                unit_price: - (total * (userData.discount.percentage / 100)),
                quantity: 1
            }
            items.push(discount)
            let preference = {
                items,
                back_urls: {

                    "success": `${ABSOLUTE_URL}/api/checkout?id=${id}`,
                    "failure": `${ABSOLUTE_URL}/api/checkout?id=${id}`,
                    "pending": `${ABSOLUTE_URL}/api/checkout?id=${id}`

                },
                auto_return: 'approved',
                additional_info: id
            };

            mercadopago.preferences.create(preference)
                .then(function (response) {
                    res.json({ buy: response.body.init_point })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
        }
    })

    .get(async (req, res) => {
        try {
            await dbConnect()
            const { id, payment_id, status, merchant_order_id } = req.query
            const cart = await Cart.findById(id).exec()
            if (!cart) return res.json({ error_msg: "No existe un carrito con el id proporcionado" })
            await User.populate(cart, { path: "user" })
            let data = {
                orders: []
            }
            if (status === "failure") {
                sendFailureEmail(cart.user.email)
                return res.redirect('/buy/failure');
            }
            cart.orders.forEach(async (order) => {
                order.products.forEach(async (p) => {
                    await Product.findByIdAndUpdate(p._id, { stock: (p.stock - p.quantity) })
                })
                const obj = {
                    buyer: cart.user._id,
                    seller: order._id,
                    products: order.products,
                    status: status === "approved" ? 'Pago realizado' : 'Pendiente de pago',
                    MerchantOrder: merchant_order_id,
                    Payment: payment_id,
                    shipping: {
                        street: cart.shipping.street,
                        location: cart.shipping.location,
                        number: cart.shipping.number,
                        info: cart.shipping.info
                    }
                }
                data.orders.push(obj);
                const EachOrder = await new Order(obj);
                await EachOrder.save()

                //--- SEND NOTIFICATION BUYER
                const buyerNotif = await User.findById(cart.user._id).exec()
                const sellerNotif = await User.findById(order._id).exec()
                if(buyerNotif){
                    const notification = {
                        img: 'https://res.cloudinary.com/jorgeleandroolaizola/image/upload/v1627517096/Notifications%20eccomics/Buy_product_ml086z.png',
                        content: `Se generó una orden por tu compra a ${sellerNotif.nickname}. Clickea aquí para ver detalles`,
                        link: `/orderDetail/${EachOrder._id}`
                    }
                    buyerNotif.notifications.unshift(notification)
                    if(buyerNotif.notifications.length > 5){
                        buyerNotif.notifications.pop()
                    }
                    await buyerNotif.save()
                }

                //--- SEND NOTIFICATION SELLER
                
                if(sellerNotif){
                    const notification = {
                        img: 'https://res.cloudinary.com/jorgeleandroolaizola/image/upload/v1627517096/Notifications%20eccomics/Sell_product_ucqcyd.png',
                        content: `Le has vendido a ${buyerNotif.nickname}. Clickea aquí para ver detalles`,
                        link: `/orderDetail/${EachOrder._id}`
                    }
                    sellerNotif.notifications.unshift(notification)
                    if(sellerNotif.notifications.length > 5){
                        sellerNotif.notifications.pop()
                    }
                    await sellerNotif.save()
                }
            })
            data.buyer = cart.user;

            if (data.orders[0].status === 'Pago realizado') {
                sendBuyConfirmation(data);
            } else {
                sendBuyPending(data);
            }

            await Cart.findByIdAndDelete(id);

            if (status === "approved") return res.redirect('/buy/success');
            if (status === "pending") return res.redirect('/buy/pending');
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
        }

    });

