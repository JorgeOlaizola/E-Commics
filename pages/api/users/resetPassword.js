import nextConnect from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import { sendResetPassword } from '../../../utils/emailService'

export default nextConnect()

.post( async (req, res) => {
    const { email } = req.body;
    try{
        await dbConnect()          
        sendResetPassword(email)   
        return res.json({ success_msg: 'Correo enviado'})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})