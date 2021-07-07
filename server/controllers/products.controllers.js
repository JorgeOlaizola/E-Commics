const Product = require('../models/Product')
const User = require('../models/User')
const Category = require('../models/Category')

const product = {}


product.createProduct = async (req, res) => {
    const { title, description, image, stock, price, user ,category } = req.body
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
    return res.redirect("/");
}

product.getProducts = async (req, res) => {
    const { search, category, } = req.query
    let result;
    if (search) {
        result = await Product.find({ title: /ol/ }, 'title image description price');
    }
    else {
        // result = await Product.find().sort({ title: 1 }); Ordenar 'asc'  =>| 1 es como el orden dado -1 opuesto
        result = await Product.find({}, 'title image description price')
    }
    return res.json(result)
}

product.getProductDetail = async (req, res) => {
    const { id } = req.query
    if (id) {
        Product.findById(id, (err, pro) => {
            if (err) return res.send("id invalido")
            Category.populate(pro,{path:'category'},(err,porduct)=>{
                if (err) return res.send("no se pudo acceder a las categorias del producto")
                User.populate(porduct, { path: "user" }, (err, product) => {
                    if (err) return res.send("no se pudo acceder al usuario del producto")
                    let result = {
                        _id: product._id,
                        title: product.title,
                        description: product.description,
                        image: product.image,
                        stock: product.stock,
                        price: product.price,
                        user: {
                            _id: product.user._id ,
                            email:product.user.email ,
                            name:product.user.name ,
                            surname:product.user.surname ,
                            nickname:product.user.nickname ,
                            avatar:product.user.avatar ,
                        },
                        category: { 
                            _id: product.category._id, 
                            title: product.category.title
                        }
                    }
                    res.json(result)
                })
            })
        })


    } else {
        req.flash("error_msg", "required id")
        return res.send(req.flash())
    }
}

product.deleteProduct = async (req, res) => {
    const { id } = req.query
    if (id) {
        const result = await Product.findByIdAndDelete(id)
        return result ?
            res.send("se elimino correctamente el producto con el id: " + result._id)
            : res.send("id invalido")
    } else {
        req.flash("error_msg", "required id")
        return res.send(req.flash())
    }
}
module.exports = product

