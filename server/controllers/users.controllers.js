const User = require('../models/User')

const users = {}


users.registerController = async (req, res) => {
    res.send('Registrado!')
}

users.logIn = async (req, res) => {
    res.send('Bienvenido!')
}

module.exports = users