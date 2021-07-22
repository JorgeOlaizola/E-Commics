import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// export const sendConfirmationEmail = (user) => {
//     const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
//     const url = `http://localhost:3000/confirmation/${token}`;
//     const msg = {
//         to: `${user.name} <${user.email}>`,
//         from: "ecommics@gmail.com",
//         subject: "Confirmacion de cuenta",
//         html: `Para validar tu correo electrónico haz click en <a href=${url}>este link</a>`
//     }
//     sgMail
//       .send(msg)
//       .then(() => {
//         console.log('Correo enviado')
//       })
//       .catch((error) => {
//         console.error(error)
//       })
// }

export const sendConfirmationEmail = (user) => {
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  const url = `http://localhost:3000/confirmation/${token}`;
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
    const url = `http://localhost:3000/reset/${token}`;
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