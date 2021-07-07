const Category = require('../models/Category');

const categories = {};

categories.categoriesController = async (req, res) => {
    const categoriesNames = await Category.find();
    res.send(categoriesNames);
} 

categories.addCategory = async (req, res) => {
    const {title} = req.body;
    const newCategory = await new Category({title});
    await newCategory.save();
    req.flash('success_msg', 'Cuenta registrada con éxito!')
    return res.send(req.flash()); 
}

module.exports = categories;