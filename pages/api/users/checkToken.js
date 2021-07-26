import nextConnect from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../server/models/User'
import jwt from 'jsonwebtoken';

export default nextConnect()

.post( async (req, res) => {
    const { token } = req.body;
    try{
        const parsedEmail = jwt.decode(token).email;
        await dbConnect()          
        
        const user = await User.findOne({ email: token })

        if(!user) {
            return res.json({
                error_msg: 'La información provista no corresponde a ningún usuario registrado. Por favor comprueba el link enviado a tu dirección de correo electrónico. En caso de tratarse de un error por favor contáctanos.'
            })        
        }

        return res.json({ success_msg: 'Success'})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})