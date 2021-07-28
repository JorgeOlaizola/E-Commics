import Product from '../../../server/models/Product'
import dbConnect from '../../../utils/dbConnect'
import nextConnect from 'next-connect'

export default nextConnect()

    .get(async (req, res) => {
        try {
            await dbConnect()
            const { search } = req.query
            if (!search) return res.json({ error_msg: "Es necesario enviar un texto atravez del search" })
            const product = await Product.find({ title: { $regex: '.*' + search + '.*', $options: 'i' } }).limit(5)
            if (product.length) {
                const result = product.map((p) => {
                    return p.title
                })

                return res.json(result)
            }
            else {
                return res.json({ error_msg: "no se encuentra ninguna coincidencia" })
            }
        }
        catch (error) {
            console.log(error)
            res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
        }
    })