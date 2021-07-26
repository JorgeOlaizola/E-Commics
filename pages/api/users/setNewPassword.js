import nextConnect from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../server/models/User'
import jwt from 'jsonwebtoken';

export default nextConnect()

.post( async (req, res) => {
    const { email, password } = req.body;

    const parsedEmail = jwt.decode(email).email;

    try{
        await dbConnect()          
        
        const user = await User.findOne({ email: parsedEmail })

        if(!user) {
            return res.json({
                error_msg: 'La información provista no corresponde a ningún usuario registrado. Por favor comprueba el link enviado a tu dirección de correo electrónico. En caso de tratarse de un error por favor contáctanos.'
            })        
        }

        const newPassword = await user.encryptPassword(password)

        await User.findOneAndUpdate({ email: parsedEmail }, { password: newPassword })

        const updatedUser = await User.findOne({ email: parsedEmail })

        return res.json({ success_msg: 'Tu contraseña ha sido reestablecida con éxito, ya puedes iniciar sesión y seguir disfrutando de todos los beneficios de E-commics!'})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})