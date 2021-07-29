import dbConnect from '../../../utils/dbConnect'
import User from '../../../server/models/User'
import nextConnect from 'next-connect'
import jwt from 'jsonwebtoken'
import Token from '../../../server/models/Token'
import { validateToken } from '../../../utils/auth'

const KEY = process.env.SECRET

export default nextConnect()

.put( async(req, res) => {
    try{
        await dbConnect()

        const { userId, githubID } = req.body

        const check = await User.findOne({}).where({ github: githubID }).exec()
        if(check) return res.json({ error_msg: 'Ya existe una cuenta vinculada a este GitHub' })

        User.findById(userId, (err, user) => {
            if(err) return res.json({ error_msg: 'ID inválido'})
            if(user.github !== "None") return res.json({ error_msg: 'Este usuario ya está vinculado a una cuenta de GitHub' })
            user.github = githubID
            if(user){
                const notification = {
                    img: 'https://res.cloudinary.com/jorgeleandroolaizola/image/upload/v1627517096/Notifications%20eccomics/vincular_con_github_dxg6hz.png',
                    content: `Has vinculado tu cuenta de E-commics con GitHub`,
                    link: `/`
                }
                user.notifications.unshift(notification)
                if(user.notifications.length > 5){
                    user.notifications.pop()
                }
            }
            user.save((err, user) => {
                if(err) return res.json({ error_msg: 'Algo salió mal'})
                return res.json({ success_msg: `La cuenta se ha vinculado a GitHubID: ${user.github} con éxito`})
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

        const { githubID } = req.body

        const user = await User.findOne({ github: githubID }).exec()
        if(!user) return res.json({ error_msg: 'No hay ninguna cuenta vinculada con ese perfil de GitHub' })
        else{

            if(user.status === 'banned'){
                return res.json({ error_msg: 'Esta cuenta ha sido baneada. Envía un email a e-commics@gmail.com para mas información.' })
            }
            if(user.status !== 'active') {
                return res.json({
                    error_msg: 'El usuario aún no se encuentra activo'
                })
            }
            
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
                    github: user.github || 'None'
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