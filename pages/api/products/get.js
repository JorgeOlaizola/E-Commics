import Category from '../../../server/models/Category'
import Category from '../../../server/models/User'
import Category from '../../../server/models/Product'

export default async (req, res) => {
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