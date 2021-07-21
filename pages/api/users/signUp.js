import nextConnect from 'next-connect'
import dbConnect from '../../../utils/dbConnect'
import User from '../../../server/models/User'


export default nextConnect()

.post( async (req, res) => {
    try{
        await dbConnect()
        const { name, surname, password, password2, nickname, email, avatar } = req.body
    
        //Validations
        if( !name || !surname || !password || !password2 || !nickname || !email || !avatar) return res.json({ error_msg: 'Hay campos sin completar' })
        if( nickname.length < 6 ) return res.json({ error_msg: 'El nickname debe tener al menos 6 caracteres' })
        if( password !== password2 ) return res.json({ error_msg: 'Las contraseñas no coinciden' })
        if( password.length < 8) return res.json({ error_msg: 'La contraseña debe tener al menos 8 caracteres' })
    
        //Verify nickname and email are available
        const testEmail = await User.find({ email })
        if(testEmail.length) return res.json({ error_msg: 'El email ya se encuentra registrado' })
        const testNickname = await User.find({ nickname })
        if(testNickname.length) return res.json({ error_msg: 'El nickname se encuentra en uso' })
    
        //Creating the user in the DB
        const newUser = new User({ name, surname, password, nickname, email, avatar, role:'user', status:'inactive' })
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        return res.json({ success_msg: 'Bienvenido a E-Commics! El registro se ha realizado con éxito'})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})