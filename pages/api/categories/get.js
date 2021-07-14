import Category from '../../../server/models/Category'

export default async (req, res) => {
    const categoriesNames = await Category.find();
    res.send(categoriesNames)
}