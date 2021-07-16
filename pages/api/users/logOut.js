import nextConnect from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import Token from '../../../server/models/Token'

export default nextConnect()

.delete(async (req, res) => {
    try {
        await dbConnect()
        const tryDelete = await Token.findOneAndDelete().where({ token: req.query.token }).exec()
        if(tryDelete) return res.json({ success_msg: 'Deslogueo con éxito' })
        else {
            return res.json({ error_msg: 'No existe el token' })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})