const { Router } = require('express')
const {  createQuestion, deleteQuestion, getQuestion } = require('../controllers/question.controllers')
const router = Router()

router.get('/', getQuestion ) // No hace falta (solo para probar)
router.post('/', createQuestion )
router.delete('/:id', deleteQuestion )


module.exports = router;