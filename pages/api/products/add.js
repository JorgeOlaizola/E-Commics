import Product from '../../../server/models/Product'
import dbConnect from '../../../utils/dbConnect'

export default async (req, res) => {

    await dbConnect();

    const { title, description, image, stock, price, user ,category } = req.body
    switch (req.method) {
        case 'POST':
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
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break
    }

}
