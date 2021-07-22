import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendConfirmationEmail = (user) => {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    const url = `http://localhost:3000/confirmation/${token}`;
    const msg = {
        to: `${user.name} <${user.email}>`,
        from: "ecommics@gmail.com",
        subject: "Confirmacion de cuenta",
        html: `Para validar tu correo electrónico haz click en <a href=${url}>este link</a>`
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