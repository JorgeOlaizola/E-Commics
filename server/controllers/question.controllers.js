const Question = require('../models/Question')
const User = require('../models/User')
const Product = require('../models/Product')


const question = {}

// GET QUESTION
question.getQuestion = async (req, res) => {
   Question.find({}, function(err, questions){
       if(err) return res.send(err)
       User.populate(questions, { path : "user" }, function(err, questions){
        if (err) return res.send("No se pudo acceder al usuario de la pregunta")
        Product.populate(questions, { path : "product" }, function(err, questions){
            if (err) return res.send("No se pudo acceder al prodcto de la pregunta")
                res.send(questions)   
            })
       })
   })
}

// POST QUESTION
question.createQuestion = async (req, res) => {
    const { content, user, product, answer } = req.body 
    if(!content){
        req.flash('error_msg', 'Content required')
        return res.send(req.flash())
    } 
    if(!user){
        req.flash('error_msg', 'User required')
        return res.send(req.flash())
    }
    if(!product){
        req.flash('error_msg', 'Product required')
        return res.send(req.flash())
    }
    const newQuestion = await new Question({ content, user, product, answer })
    await newQuestion.save()
    req.flash('success_msg', 'Question Post Succesfully') 
    return res.send(req.flash());
}

// DELTE QUESTION
question.deleteQuestion = async (req, res) => {
    await Question.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Question Deleted Successfully")
    return res.send(req.flash()) 
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