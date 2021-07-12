const Question = require('../models/Question')
const User = require('../models/User')
const Product = require('../models/Product')


const question = {}

// GET QUESTION
question.getQuestion = async (req, res) => {
    const { productId } = req.query
    Question.find({}, (err, ques) => {
        if (err) return res.json({ error_msg: 'Ocurrió un error inesperado'})
        User.populate(ques, { path: 'user' }, (err, question) => {
            if (err) return res.json({ error_msg: 'Ocurrió un error inesperado'})
            let result = question.map(q => {
                return {
                    content: q.content,
                    answer: q.answer,
                    userNickname: q.user.nickname,
                    created_at: q.created_at
                }
            })
            return res.json(result)
        })
    })
    .where({ product: productId})
}

// POST QUESTION
question.createQuestion = async (req, res) => {
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

// DELTE QUESTION
question.deleteQuestion = async (req, res) => {
    await Question.findByIdAndDelete(req.params.id);
    return res.json({ success_msg: "La pregunta se eliminó con éxito"}) 
    // res.redirect("/");
  };

// PUT QUESTION 
question.updateQuestion = async (req, res) => {
    var id = req.params.id
    Question.findOne({ _id : id }, function(err, foundAnswer){
        if(err){
            console.log(err)
            res.status(500).send()
        } 
        if(!foundAnswer){
            res.status(404).send()
        } 
        if(req.body.answer){
            foundAnswer.answer = req.body.answer
        }
        foundAnswer.save(function(err, updated){
            if(err){
                console.log(err)
                res.status(500).send()
            } else {
                res.send(updated)
            }
        })
    })
}

module.exports = question