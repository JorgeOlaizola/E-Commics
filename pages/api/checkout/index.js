import nextConnect from 'next-connect'

const mercadopago = require ('mercadopago');
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
        ]
    };
    
    mercadopago.preferences.create(preference)
    .then(function(response){
        res.redirect(response.body.init_point)
    })
    .catch(function(error){
        console.log(error);
    });
})