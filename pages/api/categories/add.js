import Category from '../../../server/models/Category'

export default async (req, res) => {
    const { method } = req
    const { title } = req.body;
    switch (method) {
        case 'GET':
            try {
                if (title) {
                    const newCategory = await new Category({ title });
                    await newCategory.save();
                    return res.json({ success_msg: 'Categoría agregada con éxito' })
                }
                return res.send('Title is required')
            }
            catch (error) {
                console.log(error)
                res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
            }
            break
        default:
            res.status(400).json({ itemnotfound: "No item found" })
            break
    }

}
