import nextConnect from "next-connect";
import Cart from '../../../server/models/Cart'
import dbConnect from '../../../utils/dbConnect'
import { ObjectID }  from 'mongodb'
export default nextConnect()

.get(async (req,res)=>{
    let { user } = req.query
    try{
        await dbConnect()
        const carrito = await Cart.find().where({user:user, status:"init"}).exec()
        if(carrito.length){
            return  res.json(carrito)
        }else{
            return res.json({error_msg:"no existe un carrito que pertenezca a ese usuario"})
        }
        
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})


.put(async (req,res)=>{
    const {user, cart} = req.body
    await dbConnect()
    try{
        const carrito = await Cart.find().where({user:user, status:"init"}).exec()
        if(carrito.length){
            let order = cart.pop()
            while(order){
                let orderByUpDate =  carrito[0].orders.find((or)=>{
                    return or._id.equals(order._id)
                })
                if(orderByUpDate){
                    for(let i = 0; i< order.products.length; i++){
                        let product = orderByUpDate.products.find((product)=>{
                            return product._id.equals(order.products[i]._id)
                        })
                        if(product){
                            product.quantity += order.products[i].quantity
                            if(product.quantity > product.stock){
                                product.quantity = product.stock
                            }
                            if(product.quantity < 1 ){
                                orderByUpDate.products = orderByUpDate.products.filter((p)=>{
                                    return p._id !== product._id
                                })
                            }
                        }else{
                            orderByUpDate.products.push(order.products[i])
                        }
                    }
                    if(orderByUpDate.products.length < 1 ){
                        carrito[0].orders = carrito[0].orders.filter((o)=>{
                            return o._id !== orderByUpDate._id
                        })
                    }
                }else{
                    carrito[0].orders.push(order)
                }
                order = cart.pop()
            }
            await carrito[0].save()
            return res.json(carrito[0])
        }
        else{
           // lo creamos
            const carrito = await new Cart({
                user,
                orders:cart
            })
            await carrito.save()
            return res.json(carrito)
        }



    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})
        // let user = "60ecf7b0ef20060e68fbebf2" // comprador
        // let orders = [
        //     {
        //         _id:"60ec5ada5314d72b3e18e9e8",// vendedor
        //         products:[
        //             {
        //             _id:"60f0f8ffed61124146ea0126",//producto
        //             unit_price:176000,
        //             title:"Superman",
        //             quantity:2,
        //             image:"URL",
        //             stock:4 
        //             }
        //         ]
        //     }
        // ]

.delete(async (req,res)=>{
    const {id} = req.query
    try{
        await dbConnect()
        const result = await Cart.findByIdAndDelete(id).exec()
        if(result){
            return res.json({success_msg:"Carrito eliminado exitosamente"})
        }
        else{
           return res.json({error_msg:"El carrito a eliminar no existe"})

        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})