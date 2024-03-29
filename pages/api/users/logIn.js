import jwt from 'jsonwebtoken'
import nextConnect from 'next-connect'
import User from '../../../server/models/User'
import Token from '../../../server/models/Token'
import dbConnect from '../../../utils/dbConnect'
import { validateToken } from '../../../utils/auth'

const KEY = process.env.SECRET

export default nextConnect()

  .post(async (req, res) => {
    const { email, password } = req.body

    await dbConnect()
    //Previous verifications
    if(!email) return res.json({ error_msg: 'Es necesario que ingrese un email' })
    if(!password) return res.json({ error_msg: 'Es necesario que ingrese una contraseña' })

    //Asking DB if the user exists
    const user = await User.findOne({ email })

    if(!user) return res.json({ error_msg: 'El usuario es inválido' })

    if(user) {

        //Asking DB if password match
        const match = await user.matchPassword(password)
        if(!match) {
            return res.json({ error_msg: 'La contraseña es incorrecta' })
        }

        //Valid credentials
        else {
            //Verify if user is confirmed
            if(user.status === 'banned'){
                return res.json({ error_msg: 'Esta cuenta ha sido baneada. Envía un email a e-commics@gmail.com para mas información.' })
            }
            if(user.status !== 'active') {
                return res.json({
                    error_msg: 'El usuario aún no se encuentra activo'
                })
            }

            //New token
            const token = jwt.sign({ id: user._id }, KEY)
            
            //Verify if this user already have a token
            const verifyToken = await Token.find({}).where({ user: user._id })
            if(verifyToken.length) {
                await Token.findOneAndUpdate({ user: user._id }, { token: token })
            }
            //If there is no token for this user in the DB, we create one
            else {
                await Token.create({ token: token, user: user._id})
            }
            return res.json({ 
                success_msg: 'Usted se ha logueado con éxito!',
                user: {
                    avatar: user.avatar,
                    nickname: user.nickname,
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    id: user._id,
                    favorites: [],
                    notifications: user.notifications,
                    github: user.github || 'None',
                    role: user.role
                },
                token: token
            })
        }
    }
  })

  .get(async (req, res, next) => {
    const verification = await validateToken(req.query.token)
    if(!verification) return res.send('Para ingresar aquí debes estar logueado')
    next()
  })

  .get(async (req, res, next) => {
      res.send('De esta manera se usan los middlewares')
  })