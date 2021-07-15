import Category from '../../../server/models/Category'
import Product from '../../../server/models/Product'
import User from '../../../server/models/User'
import Question from '../../../server/models/Question'
import dbConnect from '../../../utils/dbConnect'


export default async (req, res) => {

    await dbConnect();

    const { id } = req.query
    switch (req.method) {
        case 'GET':
            try {
            
                const product = await Product.findById(id)
                const productANDcategory = await Category.populate(product,{path:'category'})
                const productANDcategoryANDuser = await User.populate(productANDcategory, { path: "user" })
                const questions = await Question.find().where({ product: id})
                const questionsANDuser = await User.populate(questions,{path:"user"})
                let quest = questionsANDuser.map(q => {
                    return {
                        content: q.content,
                        answer: q.answer,
                        userNickname: q.user.nickname,
                        created_at: q.created_at
                    }
                })
                let result = {
                    _id: productANDcategoryANDuser._id,
                    title: productANDcategoryANDuser.title,
                    description: productANDcategoryANDuser.description,
                    image: productANDcategoryANDuser.image.includes("&&") ? product.image.split("&&") : [product.image],
                    stock: productANDcategoryANDuser.stock,
                    price: productANDcategoryANDuser.price,
                    user: {
                        _id: productANDcategoryANDuser.user._id ,
                        email:productANDcategoryANDuser.user.email ,
                        name:productANDcategoryANDuser.user.name ,
                        surname:productANDcategoryANDuser.user.surname ,
                        nickname:productANDcategoryANDuser.user.nickname ,
                        avatar:productANDcategoryANDuser.user.avatar ,
                    },
                    category: { 
                        _id: productANDcategoryANDuser.category._id, 
                        title: productANDcategoryANDuser.category.title
                    },
                    questions:quest
                }
                res.json(result)
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