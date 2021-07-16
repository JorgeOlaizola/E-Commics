import Category from '../../../server/models/Category'
import Product from '../../../server/models/Product'
import User from '../../../server/models/User'
import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'

export default nextConnect()

.get(async (req, res) => {
    await dbConnect();
    let { user,category,scorestart,scoreend,pricestart,priceend,searchin,searchtext,orderin,orderor,page, officialstore } = req.query
    let score={
        start:parseInt(scorestart),
        end:parseInt(scoreend)
    }
    let price={
        start:parseInt(pricestart),
        end:parseInt(priceend)
    }
    let search={
        in:searchin,
        text:searchtext
    }
    let order={
        in:orderin,
        or:parseInt(orderor)
    }
    if (!page) page = 1 
    let itemXPage = 20;
    let limite = page * itemXPage
    let opts = { $and: [] }
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
    if (!order || !order.in || !order.or) { order = { in: "title", or: 1 } }
    try {
        let productonly = await Product.find(opts).limit(limite).sort({ [order.in]: order.or })
        //cargamos el resto de la data 
        let productandCategories = await Category.populate(productonly, { path: 'category' })
        let productandCategoriesandUsers = await User.populate(productandCategories, { path: 'user' })
        if(officialstore === true){
            productandCategoriesandUsers = productandCategoriesandUsers.filter((p)=>{
                return p.user.role === "officialstore"
            })
        }
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
})

.post(async (req, res) => {
    await dbConnect();
    const { title, description, image, stock, price, user ,category } = req.body
    try {
        if (!title || !description || !image || !stock || !price || !user ||!category) {
            !title && req.flash("error_msg", "required title")
            !description && req.flash("error_msg", "required description")
            !image && req.flash("error_msg", "required image")
            !stock && req.flash("error_msg", "required stock")
            !price && req.flash("error_msg", "required price")
            !user && req.flash("error_msg", "required user")
            !category && req.flash("error_msg", "required category")
            return res.send(req.flash())
        }
        const newProduct = await new Product({ title, description, image, stock, price, user ,category})
        await newProduct.save()
        return res.send("The product was added successfully");
    } 
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})
