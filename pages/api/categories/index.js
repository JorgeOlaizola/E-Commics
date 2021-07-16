import Category from '../../../server/models/Category'
import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'


export default nextConnect()



.get(async (req, res, next) => {
    try {
        await dbConnect()
        const categoriesNames = await Category.find({},'title');
        res.json(categoriesNames)
    } 
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.delete(async (req, res, next) => {
    try {
        await dbConnect()
        const tryDelete = await Category.findByIdAndDelete(req.query.id).exec()
        if(tryDelete) return res.json({ success_msg: 'Categoría eliminada con éxito!'})
        else {
            return res.json({ error_msg: 'La categoría que estás buscando eliminar no existe'})
        }
    }
    catch(error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.post(async (req, res, next) => {
    try {
        await dbConnect()
        if (req.query.title) {
            const checkCategory = await Category.find().where({ title: req.query.title }).exec()
            if(!checkCategory.length){
                const newCategory =  new Category({ title: req.query.title });
                await newCategory.save();
                return res.json({ success_msg: 'Categoría agregada con éxito' })
             }
             else {
                 return res.json({ error_msg: 'Ya existe una categoría con ese nombre' })
             }
        }
        return res.json({ error_msg: 'Se necesita un título'})
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})

.put(async(req, res) => {
    try {
        await dbConnect()
        const checkCategory = await Category.find().where({ title: req.query.title }).exec()
        if(!checkCategory.length){
            const tryUpdate = await Category.findByIdAndUpdate(req.query.id, { title: req.query.title}).exec()
            if(tryUpdate) return res.json({ success_msg: 'Categoría actualizada con éxito' })
            else {
                return res.json({ error_msg: 'La categoría que estás buscando actualizar no existe' })
            }
        }
        else {
            return res.json({ error_msg: 'Ya existe una categoría con ese nombre' })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
    }
})