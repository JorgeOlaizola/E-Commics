const Category = require('../models/Category');

const categories = {};

categories.categoriesController = async (req, res) => {
    const categoriesNames = await Category.find();
    res.send(categoriesNames);
    
} 

module.exports = categories;