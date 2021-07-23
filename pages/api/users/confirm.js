import jwt from 'jsonwebtoken'
import nextConnect from 'next-connect'
import User from '../../../server/models/User'
import dbConnect from '../../../utils/dbConnect'

export default nextConnect()

  .post(async (req, res) => {
    const { token } = req.body
    const parsedEmail = jwt.decode(token).email;
    const user = await User.findOne({ email: parsedEmail })
    try {
      await dbConnect()  
      if(!user) {
          return res.json({
              error_msg: 'La información provista no corresponde a ningún usuario registrado. Por favor comprueba el link enviado a tu dirección de correo electrónico. En caso de tratarse de un error por favor contáctanos.'
          })
      }
      if(user.status === 'active') {
          return res.json({
            error_msg: 'Esta dirección de correo electrónico ya se encuentra verificada. En caso de tratarse de un error por favor contáctanos.'
          })
      }
      await User.findOneAndUpdate({ email: parsedEmail }, { status: 'active' })
      return res.json({
          success_msg: 'Tu dirección de correo electrónico ha sido verificada con éxito, ya puedes iniciar sesión y comenzar a disfrutar de todos los beneficios de E-commics!'
      })
    }
    catch (error) {
      console.log(error)
      res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
  })