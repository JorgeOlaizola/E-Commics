import nextConnect from 'next-connect'
import Cart from '../../../server/models/Cart';
import dbConnect from '../../../utils/dbConnect'

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
                "success": "http://localhost:3000/api/checkout",
                "failure": "http://localhost:3000/api/checkout",
                "pending": "http://localhost:3000/api/checkout"
            },
            auto_return: 'approved'
        };
    
        cartId = id;
        
        mercadopago.preferences.create(preference)
        .then(function(response){
            res.redirect(response.body.init_point)
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

.get(function(req, res) {

    
    const dataResponse = {
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    }
    console.log(dataResponse)
    if(req.query.status === "approved") res.redirect('/buy/success');
    if(req.query.status === "pending") res.redirect('/buy/pending');
    if(req.query.status === "failure") res.redirect('/buy/failure');
});