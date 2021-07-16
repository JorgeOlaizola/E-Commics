import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import Question from '../../../server/models/Question'
import User from '../../../server/models/User'


export default nextConnect()


// Create a question
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

//Answer a question
.put(async(req, res) => {
    try {
        await dbConnect()
        if(!req.query.id || !req.query.answer) return res.json({ error_msg: 'Campos incompletos' })
        const tryUpdate = await Question.findByIdAndUpdate(req.query.id, { answer: req.query.answer }).exec()
        if(tryUpdate) return res.json({ success_msg: 'Se agregó la respuesta a la pregunta' })
        else {
            return res.json({ error_msg: 'La pregunta que estás buscando actualizar no existe' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

//Get questions
.get(async(req, res) => {
    try {
        const questions = await Question.find().where({ product: id})
        const questionsANDuser = await User.populate(questions,{path:"user"})
        let quest = questionsANDuser.map(q => {
            return {
                _id: q._id,
                content: q.content,
                answer: q.answer,
                userNickname: q.user.nickname,
                created_at: q.created_at
            }
        })
        return res.json(quest)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})