const User = require('../models/User')

const users = {}


users.registerController = async (req, res) => {
    const { email, password, name, surname, nickname, avatar } = req.body
    if(!email || !password || !name || !surname || !nickname) {
        req.flash('error_msg', 'Debe rellenar todos los campos')
    }
    res.send('Registrado!')
}

users.logIn = async (req, res) => {
    res.send('Bienvenido!')
}

module.exports = users