import dbConnect from '../../../utils/dbConnect'
import User from '../../../server/models/User'
import nextConnect from 'next-connect'
import jwt from 'jsonwebtoken'
import Token from '../../../server/models/Token'
import { validateToken } from '../../../utils/auth'

const KEY = 'top_secret'

export default nextConnect()

.put( async(req, res) => {
    try{
        await dbConnect()

        const { userId, githubEmail } = req.body

        User.findById(userId, (err, user) => {
            if(err) return res.json({ error_msg: 'ID inválido'})
            user.github = githubEmail
            user.save((err, user) => {
                if(err) return res.json({ error_msg: 'Algo salió mal'})
                return res.json(user.github)
            })
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.post( async(req, res) => {
    try{
        await dbConnect()

        const { githubEmail } = req.body

        const user = await User.findOne({ github: githubEmail }).exec()
        if(!user) return res.json({ error_msg: 'No hay ninguna cuenta vinculada con ese perfil de GitHub' })
        else{
            const token = jwt.sign({ id: user._id }, KEY)
            //Verify if this user already have a token
            const verifyToken = await Token.find({}).where({ user: user._id })
            console.log(verifyToken)
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
                    favorites: []
                },
                token: token
            })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})