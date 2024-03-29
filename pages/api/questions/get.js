import Question from '../../../server/models/Question'
import User from '../../../server/models/User'
import dbConnect from '../../../utils/dbConnect'

export default async (req, res) => {

    await dbConnect();

    const { id } = req.query
    switch (req.method) {
        case 'GET':
            try {
                const questions = await Question.find().where({ product: id})
                const questionsANDuser = await User.populate(questions,{path:"user"})
                let quest = questionsANDuser.map(q => {
                    return {
                        _id: q._id,
                        content: q.content,
                        answer: q.answer,
                        userNickname: q.user.nickname,
                        created_at: q.created_at,
                        avatar: q.user.avatar
                    }
                })
                return res.json(quest)
            }
            catch (error) {
                console.log(error)
                res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
            }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break
    }

}