import nextConnect from 'next-connect'
import User from '../../../server/models/User'
import dbConnect from '../../../utils/dbConnect'
import discountItems from '../../../utils/discountItems'
const KEY = process.env.SECRET

export default nextConnect()

.put(async(req,res)=>{
    try{
        await dbConnect()
        const { userID , discount } = req.query
        const user = await User.findById(userID)
        if(user){
            let oldDate  = user.discount.date;
            let newDate = new Date();
            if(validateDate(oldDate,newDate)){
            user.discount = {
                percentage: discountItems[discount],
                date: new Date()
            }
            await user.save()
            return res.json(user.discount)
            }else{
                return res.json({error_msg: "Deben pasar 7 dias para volver a solicitar un descuento"})
            }
        }
        else{
            return res.json({ error_msg: 'No se encontró el usuario' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.get(async(req,res)=>{
    try {
        await dbConnect()
        const { userID } = req.query
        const user = await User.findById(userID)
        if(user){
            let oldDate  = user.discount.date;
            let newDate = new Date();
            return res.json(validateDate(oldDate,newDate))
        }
        else{
            return res.json({ error_msg: 'No se encontró el usuario' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

function validateDate(oldDate,newDate){
    const sevenDayMs = 604800000;
    let result =  newDate.getTime() - oldDate.getTime() 
    return result > sevenDayMs 
}