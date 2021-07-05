const Product = require('../models/Product')


const product = {}


product.createProduct = async (req, res) => {
    const { title, description, image, stock, price } = req.body
    if (!title || !description || !image || !stock || !price) {
        !title && req.flash("error_msg", "required title")
        !description && req.flash("error_msg", "required description")
        !image && req.flash("error_msg", "required image")
        !stock && req.flash("error_msg", "required stock")
        !price && req.flash("error_msg", "required price")
        return res.send(req.flash())
    }
    const newProduct = await new Product({ title, description, image, stock, price })
    await newProduct.save()
    return res.redirect("/");
}

product.getProducts = async (req, res)=>{
    const {search,category,} = req.query
    let result;
    if(search){
        result = await Product.find({title :/ol/},'title image description price');
    }
    else{
        // result = await Product.find().sort({ title: 1 }); Ordenar 'asc'  =>| 1 es como el orden dado -1 opuesto
        result = await Product.find({},'title image description price')
    }
    return res.json(result)
}

product.getProductDetail = async (req, res)=>{
    const {id} = req.query
    if(id){
        const result = await Product.findById(id ,"title description image stock price")
        result ?  res.json(result) : res.send("id invalido")
        
    }else{
        req.flash("error_msg", "required id")
        return res.send(req.flash())
    }
}

product.deleteProduct = async (req,res)=>{
    const {id} = req.query
    if(id){
        const result = await Product.findByIdAndDelete(id)
        return result ?  
        res.send("se elimino correctamente el producto con el id: " + result._id) 
        : res.send("id invalido")
    }else{
        req.flash("error_msg", "required id")
        return res.send(req.flash())
    }
}
module.exports = product

