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
              error_msg: 'El usuario no se encuentra registrado'
          })        
      }
      await User.findOneAndUpdate({ email: parsedEmail }, { status: 'active' })
      return res.json({
          success_msg: 'Usuario verificado'
      })
    }
    catch (error) {
      console.log(error)
      res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
  })