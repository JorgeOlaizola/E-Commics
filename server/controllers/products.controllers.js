const Product = require('../models/Product')
const User = require('../models/User')
const Category = require('../models/Category')
const axios = require('axios').default

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
    let {user,category,score,price,search,order,page} = req.body
    if (!page) page = 1;
    let itemXPage = 20;
    let limite = page * itemXPage
    let opts = {
        $and:[]
    }
    //filtro por user id
    if(user && user !== "") opts["$and"].push({user:user})

    //filtro por category id
    if(category && category !=="") opts["$and"].push( {category:category})

    // filtro por rango de puntaje
    // if(score.end){
    //     opts.$and.push({score:{$gte:score.start}},{score:{$lte:score.end}}) 
    // }

    // filtro por rango de precios
    if(price && price.end){
    opts.$and.push({price:{$gte:price.start}},{price:{$lte:price.end}}) 
    } 

    //filtro por texto ejemplo productos que en el "title" contengan "Ecommics"
    if(search && search.text) opts["$and"].push({[search.in]: { $regex: '.*' + search.text + '.*' ,$options: 'i'}} )

    //si no hay ningun filtro eliminamos la propiedad $and
    if(opts["$and"].length === 0) delete opts["$and"]

    //ordenamos la respuesta si existe un orden pedido
    if(order.in) {
        Product.find(opts, (err, products) => {
            if (err) return res.send(err)
            //cargamos el resto de la data 
            Category.populate(products, {path:'category'}, (err, products) => {
                if (err) return res.send("No se pudo acceder a las categorias del producto")
                User.populate(products, {path:'user'}, (err, products) => {
                    if (err) return res.send("no se pudo acceder al usuario del producto")
                    const ProductsTotal = products.map(products => {
                        return {
                            _id: products._id,
                        title: products.title,
                        description: products.description,
                        image:  products.image.includes("&&") ? products.image.split("&&") : [products.image],
                        price: products.price,
                        user: {
                            _id: products.user._id, 
                            nickname:products.user.nickname
                        },
                        category: { 
                            _id: products.category._id, 
                            title: products.category.title
                        }
                        }})
                        //extraemos solo los productos correspondientes a esa pagina
                        result = ProductsTotal.slice(itemXPage * (page -1),(itemXPage * (page-1)) + itemXPage)
                        return res.json(result)         
                })
            })
        }).limit(limite).sort({[order.in] : order.or})
    }
    else{
        Product.find(opts, (err, products) => {
            if (err) return res.send(err)
            //cargamos el resto de la data 
            Category.populate(products, {path:'category'}, (err, products) => {
                if (err) return res.send("No se pudo acceder a las categorias del producto")
                User.populate(products, {path:'user'}, (err, products) => {
                    if (err) return res.send("no se pudo acceder al usuario del producto")
                    const ProductsTotal = products.map(products => {
                        return {
                            _id: products._id,
                        title: products.title,
                        description: products.description,
                        image: products.image.includes("&&") ? products.image.split("&&") : [products.image],
                        price: products.price,
                        user: {
                            _id: products.user._id, 
                            nickname:products.user.nickname
                        },
                        category: { 
                            _id: products.category._id, 
                            title: products.category.title
                        }
                        }})
                        //extraemos solo los productos correspondientes a esa pagina
                        result = ProductsTotal.slice(itemXPage * (page -1),(itemXPage * (page-1)) + itemXPage)
                    return res.json(result)        
                })
            })
        }).limit(limite)    
    }

}

product.getProductDetail = async (req, res) => {
    const { id } = req.query
    axios.get(`${process.env.NEXT_PUBLIC_LOCALHOST}/api/questions?productId=${id}`)
    .then(r => {
    if (id) {
        Product.findById(id, (err, pro) => {
            if (err) return res.send("id invalido")
            Category.populate(pro,{path:'category'},(err,product)=>{
                if (err) return res.send("no se pudo acceder a las categorias del producto")
                User.populate(product, { path: "user" }, (err, product) => {
                    if (err) return res.send("no se pudo acceder al usuario del producto")
                    let result = {
                        _id: product._id,
                        title: product.title,
                        description: product.description,
                        image: product.image.includes("&&") ? product.image.split("&&") : [product.image],
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
                        },
                        questions: r.data
                    }
                    res.json(result)
                })
            })
        })


    } else {
        return res.json({ error_msg: 'Se necesita un ID'})
    }})
}

product.deleteProduct = async (req, res) => {
    const { id } = req.query
    if (id) {
        const result = await Product.findByIdAndDelete(id)
        return result ?
            res.send("se elimino correctamente el producto con el id: " + result._id)
            : res.send("id invalido")
    } else {
        return res.json({ error_msg: 'Se necesita un ID'})
    }
}
module.exports = product

