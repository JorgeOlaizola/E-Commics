const { Router } = require('express')
const {  createQuestion, deleteQuestion, getQuestion, updateQuestion } = require('../controllers/question.controllers')
const router = Router()

router.get('/', getQuestion ) // No hace falta (solo para probar)
router.post('/', createQuestion )
router.delete('/:id', deleteQuestion )
router.put('/:id', updateQuestion)

module.exports = router;