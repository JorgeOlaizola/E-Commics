import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import User from '../../../server/models/User'

export default nextConnect()

.put( async(req, res) => {
    try{
        await dbConnect()

        const { userId, status } = req.body
        
        const user = await User.findById(userId).exec()
        user.status = status
        await user.save()
        return res.json({ success_msg: 'Usuario actualizado con éxito' })
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    } 
})