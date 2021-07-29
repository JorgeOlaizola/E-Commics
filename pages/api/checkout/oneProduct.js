import nextConnect from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import Order from '../../../server/models/Order'
import Product from '../../../server/models/Product'
import User from '../../../server/models/User'
import  { ObjectId } from 'mongodb'
import { sendFailureEmail, oneProductConfirmation, oneProductPending } from '../../../utils/emailService'

const mercadopago = require ('mercadopago');
const ABSOLUTE_URL = process.env.ABSOLUTE_URL

mercadopago.configure({
    access_token: 'APP_USR-2393330903375761-071320-cef66732946fab7378373774538693b7-790658216'
});
export default nextConnect()

.post(async (req, res) => {
    const { user, product , quantity  } = req.body;
    try{
        let items =[{
            unit_price: product.price,
            title:product.title,
            quantity: quantity
        }];
        
        let preference = {
            items,
            back_urls: {
                "success": `${ABSOLUTE_URL}/api/checkout/oneProduct?buyer=${user}&seller=${product.user._id}&quantity=${quantity}&stock=${product.stock}&productId=${product._id}`,
                "failure": `${ABSOLUTE_URL}/api/checkout/oneProduct?buyer=${user}&seller=${product.user._id}&quantity=${quantity}&stock=${product.stock}&productId=${product._id}`,
                "pending": `${ABSOLUTE_URL}/api/checkout/oneProduct?buyer=${user}&seller=${product.user._id}&quantity=${quantity}&stock=${product.stock}&productId=${product._id}`
            },
            auto_return: 'approved',

        };
        
        mercadopago.preferences.create(preference)
        .then(function(response){
            res.json({ buy: response.body.init_point })
        })
        .catch(function(error){
            console.log(error);
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.get(async (req, res) => {
    try{
        await dbConnect()
        const { buyer, seller, quantity,stock, productId, payment_id, status, merchant_order_id } = req.query

        const buyerData = await User.findById(buyer);

        let data = {
            buyer: buyerData
        }

        if(status === "failure") {
            sendFailureEmail(data.buyer.email)
            return res.redirect('/buy/failure');
        }
        const prod = await Product.findByIdAndUpdate(productId, { stock: (parseInt(stock) - quantity) })
        console.log(prod)
            const obj = {
                buyer:buyer,
                seller:seller,
                products: [{
                    _id: prod._id,
                    unit_price: prod.price,
                    title: prod.title,
                    quantity,
                    image: prod.image
                }],
                status : status === "approved" ? 'Pago realizado' : 'Pendiente de pago',
                MerchantOrder: merchant_order_id,
                Payment: payment_id
            }
            data.product = obj;
            await Order.create(obj);
            if(obj.status === 'Pago realizado') {
                oneProductConfirmation(data);
            } else {
                oneProductPending(data);
            }
        if(status === "approved") return res.redirect('/buy/success');
        if(status === "pending") return res.redirect('/buy/pending');
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
});