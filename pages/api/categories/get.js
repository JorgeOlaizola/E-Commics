import {model} from 'mongoose'
const Category = model.Category

export default async (req, res) => {
    const categoriesNames = await Category.find();
    res.send(categoriesNames)
}