import nextConnect from 'next-connect'

const mercadopago = require ('mercadopago');

let cartId;

mercadopago.configure({
    access_token: 'APP_USR-2393330903375761-071320-cef66732946fab7378373774538693b7-790658216'
});
export default nextConnect()

.post(async (req, res) => {
    const { title, price } = req.body;
    let preference = {
        items: [
        {
            title: title,
            unit_price: parseInt(price),
            quantity: 1,
        }
        ],
        back_urls: {
			"success": "http://localhost:3000/api/checkout",
			"failure": "http://localhost:3000/api/checkout/success",
			"pending": "http://localhost:3000/api/checkout/success"
		},
        auto_return: 'approved'
    };

    cartId = title;
    
    mercadopago.preferences.create(preference)
    .then(function(response){
        res.redirect(response.body.init_point)
    })
    .catch(function(error){
        console.log(error);
    });
})

.get(function(req, res) {

    const dataResponse = {
       Payment: req.query.payment_id,
       Status: req.query.status,
       MerchantOrder: req.query.merchant_order_id
    }

    if(req.query.status === "approved") res.redirect('/buy/success');
});