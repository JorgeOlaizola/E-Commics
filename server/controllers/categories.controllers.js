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
    return res.redirect("/"); 
}

module.exports = categories;