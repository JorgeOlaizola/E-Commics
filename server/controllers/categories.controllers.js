const { response } = require('express');
const Category = require('../models/Category');

const categories = {};

categories.categoriesController = async (req, res) => {
    const categoriesNames = await Category.find();
    res.send(categoriesNames);
} 

categories.addCategory = async (req, res) => {
    const { title } = req.body;
    if (title) {
        const newCategory = await new Category({title});
        await newCategory.save();
        return res.json({ success_msg: 'Categoría agregada con éxito'})
    }
    return res.send('Title is required')
}

module.exports = categories;