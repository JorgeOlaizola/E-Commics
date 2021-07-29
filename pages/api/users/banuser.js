import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import User from '../../../server/models/User'
import Order from '../../../server/models/Order'
import Question from '../../../server/models/Question'
import Product from '../../../server/models/Product'

export default nextConnect()

.put( async(req, res) => {
    try{
        await dbConnect()

        const { userId, status } = req.body
        let user = await User.findById(userId).exec()
        if(status === 'banned'){
            user.status = status

            //----------------------------------------------------
            //User interactions Handler
            //----------------------------------------------------
            //-----DELETING QUESTIONS 
            let userQuestions = await Question.find({}).where({ user: userId }).exec()
            userQuestions && userQuestions.length > 0 && userQuestions.map(async (q) => {
                return(
                    await Question.findByIdAndDelete(q._id)
                )
            })

            //-----UPDATING PRODUCT STATUS
            let userProducts = await Product.find({}).where({ user: userId }).exec()
            userProducts && userProducts.length > 0 && userProducts.map(async (p) => {
                return(
                    await Product.findByIdAndUpdate(p._id, { status: 'inactive' })
                )
            })

            //-----BUYS AND SELL NOTIFICATION HANDLER
            let userBuys = await Order.find({}).where({ buyer: userId }).exec()

            let userSells = await Order.find({}).where({ seller: userId }).exec()


            await user.save()
            return res.json({ success_msg: 'Usuario baneado con éxito'})

        }
        if(status === 'active'){
            user.status = status

            //----------------------------------------------------
            //User interactions Handler
            //----------------------------------------------------
            //---UPDATING PRODUCT STATUS
            let userProducts = await Product.find({}).where({ user: userId }).exec()
            userProducts && userProducts.length > 0 && userProducts.map(async (p) => {
                return(
                    await Product.findByIdAndUpdate(p._id, { status: 'active' })
                )
            })

            //-----BUYS AND SELL NOTIFICATION HANDLER
            let userBuys = await Order.find({}).where({ buyer: userId }).exec()

            let userSells = await Order.find({}).where({ seller: userId }).exec()

            //User notification handler
            if(user){
                const notification = {
                    img: 'https://res.cloudinary.com/jorgeleandroolaizola/image/upload/v1627578321/Notifications%20eccomics/Unban_xywe6a.png',
                    content: `Se habilitó nuevamente tu cuenta de E-Commics. Recuerda leer los términos y condiciones para evitar futuros inconvenientes`,
                    link: `/help/terms-and-conditions`
                }
                user.notifications.unshift(notification)
                if(user.notifications.length > 5){
                    user.notifications.pop()
                }
            }
            await user.save()
            return res.json({ success_msg: 'Usuario desbaneado con éxito' })
        }
        return res.json({ error_msg: 'Algo salió mal'})
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    } 
})