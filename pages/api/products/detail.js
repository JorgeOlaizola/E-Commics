import Category from '../../../server/models/Category'
import Product from '../../../server/models/Product'
import User from '../../../server/models/User'
import Review from '../../../server/models/Review'
import Location from '../../../server/models/Location'
import Question from '../../../server/models/Question'
import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import { ObjectID }  from 'mongodb'

export default nextConnect()

    .get(async (req, res) => {
        await dbConnect();
        const { id } = req.query
        try {
            const product = await Product.findById(id)
            const productANDcategory = await Category.populate(product, { path: 'category' })
            const productANDcategoryANDuser = await User.populate(productANDcategory, { path: "user" })
            const questions = await Question.find().where({ product: id })
            const questionsANDuser = await User.populate(questions, { path: "user" })
            const reviews = await Review.find({}).where({ product: id }).exec()
            const location = await Location.findById(productANDcategoryANDuser.user.location)
            let quest = questionsANDuser.map(q => {
                return {
                    _id: q._id,
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
                realprice: productANDcategoryANDuser.realprice,
                discount: productANDcategoryANDuser.discount,
                user: {
                    _id: productANDcategoryANDuser.user._id,
                    email: productANDcategoryANDuser.user.email,
                    name: productANDcategoryANDuser.user.name,
                    surname: productANDcategoryANDuser.user.surname,
                    nickname: productANDcategoryANDuser.user.nickname,
                    avatar: productANDcategoryANDuser.user.avatar,
                    location: location.location
                },
                category: {
                    _id: productANDcategoryANDuser.category._id,
                    title: productANDcategoryANDuser.category.title
                },
                reviews,
                questions: quest
            }
            res.json(result)
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
        }
    })

    .put(async (req, res) => {
        try {
            const { product } = req.body
            await dbConnect()
            let productDB = await Product.findById(product._id)
            if(!product.user || !productDB.user.equals(product.user._id)) {
                return res.json({error_msg:"El usuario no es válido"})
            } 
            if (product.category?._id) productDB.category = product.category._id
            if (product.title) productDB.title = product.title
            if (product.description) productDB.description = product.description
            if (product.image && Array.isArray(product.image)) productDB.image = product.image.join('&&')
            if (product.stock) productDB.stock = product.stock
            if (product.realprice) productDB.realprice = product.realprice
            if(product.discount) productDB.discount = product.discount
            productDB.price = productDB.applyDiscount(productDB.realprice, productDB.discount)
            await productDB.save()
            return res.send(productDB)
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
        }
    })