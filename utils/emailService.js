import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import Location from '../server/models/Location'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendConfirmationEmail = (user) => {
   const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
   const url = `https://e-commics.vercel.app/confirmation/${token}`;
   const msg = {
      from:{
      email: "ecommics@gmail.com"
      },
      personalizations:[
         {
            to:[
               {
                  email: `${user.email}`
               }
            ],
            dynamic_template_data:{
               name: `${user.name}`,
               token: `${url}`
            }
         }
      ],
      template_id:"d-8a9f8241454248cc8a6ffd0f85e81687"
   }
   sgMail
      .send(msg)
      .then(() => {
      console.log('Correo enviado')
      })
      .catch((error) => {
      console.error(error)
      })
}

export const sendResetPassword = (email) => {
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    const url = `https://e-commics.vercel.app/reset/${token}`;
    const msg = {
      from:{
        email: "ecommics@gmail.com"
      },
      personalizations:[
         {
            to:[
               {
                  email: `${email}`
               }
            ],
            dynamic_template_data:{
               token: `${url}`
            },
         }
      ],
      subject: "Reestablece tu contraseña",
      template_id:"d-52f5812577ec419da52fb3d2967869bf"
   }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Correo enviado')
      })
      .catch((error) => {
        console.error(error)
      })
}

export const sendBuyConfirmation = async(data) => {
   let priceTotal = 0;
   let values = []
   for(let i = 0; i < data.orders.length; i++){
      for(let j = 0; j < data.orders[i].products.length; j++){
         priceTotal = priceTotal + (data.orders[i].products[j].unit_price * data.orders[i].products[j].quantity);
         data.orders[i].products[j].image = data.orders[i].products[j].image[0];
         values.push(data.orders[i].products[j])
      }
   }
   let actualDate = new Date()
   actualDate = actualDate.toLocaleDateString()
   const city = await Location.findById(data.buyer.location)
   const msg = {
     from:{
       email: "ecommics@gmail.com"
     },
     personalizations:[
        {
           to:[
              {
                 email: `${data.buyer.email}`
              }
           ],
           dynamic_template_data:{
               orderNumber: data.orders[0]?.MerchantOrder,
               date: actualDate,
               subtotal: priceTotal,
               total: priceTotal,
               discount: "0",
               buyerName: data.buyer.nickname,
               buyerAdress: "Dorrego 1689",
               buyerCity: city.location,
               user: {
                  orderHistory: values
               }
           },
        }
     ],
     subject: "Resumen de tu compra",
     template_id:"d-92c5a634cb4e406e9c760ab9c90e4bf8"
  }
   sgMail
     .send(msg)
     .then(() => {
       console.log('Correo enviado')
     })
     .catch((error) => {
       console.error(error)
     })
}

export const oneProductConfirmation = async(data) => {
   let actualDate = new Date()
   actualDate = actualDate.toLocaleDateString()
   const city = await Location.findById(data.buyer.location)
   let priceTotal = data.product.products[0].unit_price * data.product.products[0].quantity;
   let values = [{title: data.product.products[0].title, quantity: data.product.products[0].quantity, image: data.product.products[0].image, unit_price: data.product.products[0].unit_price}]
   const msg = {
     from:{
       email: "ecommics@gmail.com"
     },
     personalizations:[
        {
           to:[
              {
                 email: `${data.buyer.email}`
              }
           ],
           dynamic_template_data:{
               orderNumber:  data.product.MerchantOrder,
               date: actualDate,
               subtotal: priceTotal,
               total: priceTotal,
               discount: "0",
               buyerName: data.buyer.nickname,
               buyerAdress: "Dorrego 1689",
               buyerCity: city.location,
               user: {
                  orderHistory: values
               }
           },
        }
     ],
     subject: "Resumen de tu compra",
     template_id:"d-92c5a634cb4e406e9c760ab9c90e4bf8"
  }
   sgMail
     .send(msg)
     .then(() => {
       console.log('Correo enviado')
     })
     .catch((error) => {
       console.error(error)
     })
}

export const sendBuyPending = async(data) => {
   let priceTotal = 0;
   let values = []
   for(let i = 0; i < data.orders.length; i++){
      for(let j = 0; j < data.orders[i].products.length; j++){
         priceTotal = priceTotal + (data.orders[i].products[j].unit_price * data.orders[i].products[j].quantity);
         data.orders[i].products[j].image = data.orders[i].products[j].image[0];
         values.push(data.orders[i].products[j])
      }
   }
   let actualDate = new Date()
   actualDate = actualDate.toLocaleDateString()
   const city = await Location.findById(data.buyer.location)
   const msg = {
     from:{
       email: "ecommics@gmail.com"
     },
     personalizations:[
        {
           to:[
              {
                 email: `${data.buyer.email}`
              }
           ],
           dynamic_template_data:{
               orderNumber: data.orders[0]?.MerchantOrder,
               date: actualDate,
               subtotal: priceTotal,
               total: priceTotal,
               discount: "0",
               buyerName: data.buyer.nickname,
               buyerAdress: "Dorrego 1689",
               buyerCity: city.location,
               user: {
                  orderHistory: values
               }
           },
        }
     ],
     subject: "Compra pendiente de pago",
     template_id:"d-8e15912bb3f243ad81a26dcf21a50ebf"
  }
   sgMail
     .send(msg)
     .then(() => {
       console.log('Correo enviado')
     })
     .catch((error) => {
       console.error(error)
     })
}

export const oneProductPending = async(data) => {
   let actualDate = new Date()
   actualDate = actualDate.toLocaleDateString()
   const city = await Location.findById(data.buyer.location)
   let priceTotal = data.product.products[0].unit_price * data.product.products[0].quantity;
   let values = [{title: data.product.products[0].title, quantity: data.product.products[0].quantity, image: data.product.products[0].image, unit_price: data.product.products[0].unit_price}]
   const msg = {
     from:{
       email: "ecommics@gmail.com"
     },
     personalizations:[
        {
           to:[
              {
                 email: `${data.buyer.email}`
              }
           ],
           dynamic_template_data:{
               orderNumber:  data.product.MerchantOrder,
               date: actualDate,
               subtotal: priceTotal,
               total: priceTotal,
               discount: "0",
               buyerName: data.buyer.nickname,
               buyerAdress: "Dorrego 1689",
               buyerCity: city.location,
               user: {
                  orderHistory: values
               }
           },
        }
     ],
     subject: "Resumen de tu compra",
     template_id:"d-8e15912bb3f243ad81a26dcf21a50ebf"
  }
   sgMail
     .send(msg)
     .then(() => {
       console.log('Correo enviado')
     })
     .catch((error) => {
       console.error(error)
     })
}

export const sendFailureEmail = (arg) => {
   const msg = {
      from:{
      email: "ecommics@gmail.com"
      },
      personalizations:[
         {
            to:[
               {
                  email: `${arg}`
               }
            ],
            dynamic_template_data:{
            }
         }
      ],
      template_id:"d-2901b4c024854c02af09b5317942f512"
   }
   sgMail
     .send(msg)
     .then(() => {
       console.log('Correo enviado')
     })
     .catch((error) => {
       console.error(error)
     })
}

export const buyDispatch = async(data) => {
   const msg = {
      from:{
         email: "ecommics@gmail.com"
      },
      personalizations: [
         {
            to:[
               {
                  email: data.buyer.email,
               }
            ],
            dynamic_template_data:{
               buyer: data.buyer.nickname,
               seller: data.seller,
               order: data.order
            }
         }
      ],
      template_id: "d-ab246e0ac1284b00aada6f4e4b276c62"
   }
   sgMail
   .send(msg)
   .then(() => {
     console.log('Correo enviado')
   })
   .catch((error) => {
     console.error(error)
   })
}

export const buyDoneSeller = async(data) => {
   const msg = {
      from:{
         email: "ecommics@gmail.com"
      },
      personalizations: [
         {
            to:[
               {
                  email: data.seller.email,
               }
            ],
            dynamic_template_data:{
               buyer: data.buyer.nickname,
               seller: data.seller.nickname,
               order: data.order
            }
         }
      ],
      template_id: "d-36ca6f7326fd4b12b6acedc444d37331"
   }
   sgMail
   .send(msg)
   .then(() => {
     console.log('Correo enviado')
   })
   .catch((error) => {
     console.error(error)
   })
}

export const buyDoneBuyer = async(data) => {
   const msg = {
      from:{
         email: "ecommics@gmail.com"
      },
      personalizations: [
         {
            to:[
               {
                  email: data.buyer.email,
               }
            ],
            dynamic_template_data:{
               buyer: data.buyer.nickname,
               seller: data.seller.nickname,
               order: data.order
            }
         }
      ],
      template_id: "d-9f5632e8834f449c917739781f85907e"
   }
   sgMail
   .send(msg)
   .then(() => {
     console.log('Correo enviado')
   })
   .catch((error) => {
     console.error(error)
   })
}