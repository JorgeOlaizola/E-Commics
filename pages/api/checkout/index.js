import nextConnect from 'next-connect'
import Cart from '../../../server/models/Cart';
import dbConnect from '../../../utils/dbConnect'
import Order from '../../../server/models/Order'
import Product from '../../../server/models/Product'

const mercadopago = require ('mercadopago');

let cartId;

mercadopago.configure({
    access_token: 'APP_USR-2393330903375761-071320-cef66732946fab7378373774538693b7-790658216'
});
export default nextConnect()

.post(async (req, res) => {
    const { id } = req.query;
    try{
        await dbConnect()
        let items =[];
        const cart = await Cart.findById(id).exec()
        if(!cart)  return res.json({error_msg:"No existe un carrito con el id proporcionado"})

        cart.orders.forEach((or)=>{
            items =  items.concat(or.products)
        })
        let preference = {
            items,
            back_urls: {
                "success": `http://localhost:3000/api/checkout?id=${id}`,
                "failure": `http://localhost:3000/api/checkout?id=${id}`,
                "pending": `http://localhost:3000/api/checkout?id=${id}`
            },
            auto_return: 'approved',
            additional_info : id

        };
    
        cartId = id;
        
        mercadopago.preferences.create(preference)
        .then(function(response){
            console.log("estoy mandando la url")
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
        
        const { id, payment_id, status, merchant_order_id } = req.query 

        if(status === "failure") return res.redirect('/buy/failure');

        const cart = await Cart.findById(id).exec()
        if(!cart)  return res.json({ error_msg:"No existe un carrito con el id proporcionado" })
        cart.orders.forEach(async (order) => {
            order.products.forEach( async(p) => {
                await Product.findByIdAndUpdate(p._id, { stock: (p.stock - p.quantity) })
            })
            const obj = {
                buyer: cart.user,
                seller: order._id,
                products: order.products,
                status: status,
                MerchantOrder: merchant_order_id,
                Payment: payment_id
            }
            await Order.create(obj)
        })


        await Cart.findByIdAndDelete(id)
    
        if(status === "approved") return res.redirect('/buy/success');
        if(status === "pending") return res.redirect('/buy/pending');
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
});