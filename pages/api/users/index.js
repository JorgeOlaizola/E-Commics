import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import jwt from 'jsonwebtoken'


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