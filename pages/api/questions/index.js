import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import Question from '../../../server/models/Question'


export default nextConnect()

.post(async (req, res, next) => {
    try {
        await dbConnect()
        const { content, user, product } = req.body
        if(!content){
            return res.json({ error_msg: 'Es necesario que la pregunta tenga un contenido' })
        } 
        if(!user){
            return res.json({ error_msg: 'Es necesario el usuario que realizó la pregunta'})
        }
        if(!product){
            return res.json({ error_msg: 'La pregunta debe ser realizada en un producto'})
        }
        const newQuestion = await new Question({ content, user, product, answer: '' })
        await newQuestion.save()
        return res.json(newQuestion)
        }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})