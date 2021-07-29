import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import jwt from 'jsonwebtoken'
import { validateToken } from '../../../utils/auth'
import User from '../../../server/models/User'
import { ObjectID }  from 'mongodb'


export default nextConnect()

.get(async(req, res, next) => {
    try{
        await dbConnect()
        const verification = await validateToken(req.query.token)
        if(verification) {
            res.json({ success_msg: 'Autorizado', login: true})
        }
        else{
            res.json({ success_msg: 'No autorizado', login: false})
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.post( async(req, res) => {
    try{
        await dbConnect()
        const { userID } = req.body
        const user = await User.findById(userID)
        if(user){
            return res.json({
                _id: user._id,
                name: user.name,
                surname: user.surname,
                avatar: user.avatar,
                nickname: user.nickname,
                role: user.role,
                notifications: user.notifications
            })
        }
        else{
            return res.json({ error_msg: 'No se encontró el usuario' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

