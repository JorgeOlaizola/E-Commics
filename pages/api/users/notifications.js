import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import User from '../../../server/models/User'

export default nextConnect()

.get( async(req,res) => {
    try{
        await dbConnect()

        const { userId } = req.query
        const notifications = await User.findById(userId).exec()
        return res.json(notifications.notifications)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.put (async(req, res) => {
    try{
        await dbConnect()

        //Delete notification

        const { userId, notificationId } = req.query
        const user = await User.findById(userId).exec()
        user.notifications = user.notifications.filter(n => !n._id.equals(notificationId))
        await user.save()
        return res.json(user.notifications)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.post( async(req, res) => {
    try{

        await dbConnect()

        const { userId, img, link, content } = req.body
        const user = await User.findById(userId).exec()
        if(user){
            user.notifications.unshift({ content, link, img })
            if(user.notifications.length > 5){
                user.notifications.pop()
            }
            await user.save()
            return res.json({ sucess_msg: 'Notificación agrega con éxito'})
        }
        return res.json({ error_msg: 'No se encontró al usuario'})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})