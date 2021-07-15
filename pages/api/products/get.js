import Category from '../../../server/models/Category'
import Product from '../../../server/models/Product'
import User from '../../../server/models/User'
import dbConnect from '../../../utils/dbConnect'


export default async (req, res) => {

    await dbConnect();

    const { method } = req
    let {
        user,
        category,
        score,
        price,
        search,
        order,
        page
    } = req.body
    if (!page) {
        page = 1
    }
    let itemXPage = 20;
    let limite = page * itemXPage
    let opts = {
        $and: []
    }
    //filtro por user id
    if (user && user !== "") opts["$and"].push({ user: user })

    //filtro por category id
    if (category && category !== "") opts["$and"].push({ category: category })

    // filtro por rango de puntaje
    // if(score.end){
    //     opts.$and.push({score:{$gte:score.start}},{score:{$lte:score.end}}) 
    // }

    // filtro por rango de precios
    if (price && price.end) {
        opts.$and.push({ price: { $gte: price.start } }, { price: { $lte: price.end } })
    }

    //filtro por texto ejemplo productos que en el "title" contengan "Ecommics"
    if (search && search.text) opts["$and"].push({ [search.in]: { $regex: '.*' + search.text + '.*', $options: 'i' } })

    //si no hay ningun filtro eliminamos la propiedad $and
    if (opts["$and"].length === 0) delete opts["$and"]



    switch (method) {
        case 'POST':
            // Get data from your database
            try {
                if (!order || !order.in || !order.or) {
                    order = { in: "title", or: 1 }
                }
                let productonly = await Product.find(opts).limit(limite).sort({ [order.in]: order.or })
                //cargamos el resto de la data 
                let productandCategories = await Category.populate(productonly, { path: 'category' })

                let productandCategoriesandUsers = await User.populate(productandCategories, { path: 'user' })
                const ProductsTotal = productandCategoriesandUsers.map(products => {
                    return {
                        _id: products._id,
                        title: products.title,
                        description: products.description,
                        image: products.image.includes("&&") ? products.image.split("&&") : [products.image],
                        price: products.price,
                        user: {
                            _id: products.user._id,
                            nickname: products.user.nickname
                        },
                        category: {
                            _id: products.category._id,
                            title: products.category.title
                        }
                    }
                })
                let result = ProductsTotal.slice(itemXPage * (page - 1), (itemXPage * (page - 1)) + itemXPage)
                res.json(result)
            }
            catch (error) {
                console.log(error)
                res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
            }

            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break
    }
}