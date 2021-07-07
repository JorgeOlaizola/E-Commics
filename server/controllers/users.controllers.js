const User = require('../models/User');
const passport = require('passport')

const users = {}


users.registerController = async (req, res) => {
    const { email, password, password2, name, surname, nickname, avatar } = req.body
    console.log(req.body)
    if(!email || !password || !name || !surname || !nickname) {
        req.flash('error_msg', 'Debe rellenar todos los campos obligatorios')
        res.send(req.flash())
    }
    if(nickname.length < 6) {
        req.flash('error_msg', 'El nombre de usuario debe tener por lo menos 6 caracteres')
        res.send(req.flash())
    }
    if(password.length < 6) {
        req.flash('error_msg', 'La contraseña debe tener al menos 6 caracteres')
        res.send(req.flash())
    }
    if(password !== password2){
        req.flash('error_msg', 'Las contraseñas deben coincidir')
        res.send(req.flash())
    }
    if(name.length < 3) {
        req.flash('error_msg', 'Tu nombre no puede tener menos de 3 caracteres')
        res.send(req.flash())
    }
    if(surname.length < 3) {
        req.flash('error_msg', 'Tu apellido no puede tener menos de 3 caracteres')
        res.send(req.flash())
    }
    const CheckNickname = await User.findOne({ nickname: nickname })
    if(!CheckNickname){
        const CheckEmail = await User.findOne({ email: email })
        if(!CheckEmail) {
            const newUser = await new User({ email, password, password2, name, surname, nickname, avatar, role:"user" })
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', 'Cuenta registrada con éxito!')
            res.send(req.flash())
        }
        else {
            req.flash('error_msg', 'Este email ya se encuentra registrado')
            res.send(req.flash())
        }
    }
    else {
        req.flash('error_msg', 'Este usuario ya se encuentra registrado')
        res.send(req.flash())
    }
    res.send('Registrado!')
}

users.logIn = passport.authenticate('local', {
    failureRedirect: '/logIn',
    successRedirect: '/',
    failureFlash: true
})

users.logOut = async (req, res) => {
    req.logout();
    req.flash('success_msg', 'Sesión cerrada correctamente');
    res.send(req.flash())
}

users.userInfo = async (req, res) => {
    const {_id, email, nickname, name, surname } = req.user
    res.json({_id, email, nickname, name, surname})

}


module.exports = users