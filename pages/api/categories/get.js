import Category from '../../../server/models/Category'

export default async (req, res) => {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const categoriesNames = await Category.find({},'title');
                res.send(categoriesNames)
            } 
            catch (error) {
                console.log(error)
                res.status(500).send({ error_msg: "Ups! 🙊 Error en el servidor, lo siento 🙈" })
            }
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
            break
    }

}