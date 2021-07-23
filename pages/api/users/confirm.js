import jwt from 'jsonwebtoken'
import nextConnect from 'next-connect'
import User from '../../../server/models/User'
import Token from '../../../server/models/Token'
import dbConnect from '../../../utils/dbConnect'
import { validateToken } from '../../../utils/auth'

const KEY = 'top_secret'

export default nextConnect()

  .post(async (req, res) => {
    const { token } = req.body

    const user = await User.findOne({ email: token })

    if(!user) {
        return res.json({
            error_msg: 'El usuario no se encuentra registrado'
        })        
    }

    await User.findOneAndUpdate({ email: token }, { status: 'active' })

    return res.json({
        success_msg: 'Usuario verificado'
    })
  })