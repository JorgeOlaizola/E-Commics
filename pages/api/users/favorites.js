import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'
import { validateToken } from '../../../utils/auth'
import User from '../../../server/models/User'
import Product from '../../../server/models/Product'
import { ObjectID }  from 'mongodb'



export default nextConnect()

.get(async(req, res) => {
    try{
        await dbConnect()
        const verification = await validateToken(req.query.token)
        if(!verification) return res.json({ error_msg: 'Unauthorized'})
        const user = await User.findById(req.query.userID)
        const userFavorites = await Product.populate(user, { path: 'favorites' })
        return res.json(userFavorites.favorites)
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})


.put(async(req, res, next) => {
    try{    
        await dbConnect()
        const { productId, userId } = req.body
        User.findById(userId, (err, user) => {
            if(err) return res.json({ error_msg: 'ID inválido'})
            if(user.favorites.includes(productId)){
                user.favorites = user.favorites.filter((f) => {
                    return !f.equals(productId)
                })    
            }
            else{ 
                user.favorites.push(
                    productId
                ) 
            }
            user.save((err, user) => {
                if(err) return res.json({ error_msg: 'ID de producto inválido'})
                return res.json(user.favorites)
            })
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})