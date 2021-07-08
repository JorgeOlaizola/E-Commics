const Question = require('../models/Question')
const User = require('../models/User')

const question = {}

// GET QUESTION
question.getQuestion = async (req, res) => {
   Question.find({}, function(err, questions){
       User.populate(questions, { path : "user" }, function(err, questions){
           res.send(questions)
       })
   })
}

// POST QUESTION
question.createQuestion = async (req, res) => {
    const { content, user } = req.body 
    if(!content){
        req.flash('error_msg', 'Question required')
        return res.send(req.flash())
    } 
    if(!user){
        req.flash('error_msg', 'autor required')
        return res.send(req.flash())
    }

    const newQuestion = await new Question({ content, user })
    await newQuestion.save()
    return res.redirect("/");
}

// DELTE QUESTION
question.deleteQuestion = async (req, res) => {
    await Question.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "Question Deleted Successfully");
    res.redirect("/");
  };

module.exports = question