const User = require('../models/User');
const passport = require('passport')
const Product = require('../models/Product')
ObjetcID = require('mongodb').ObjetcID

const users = {}


users.registerController = async (req, res) => {
    const { email, password, password2, name, surname, nickname, avatar } = req.body
    console.log(req.body)
    if(!email || !password || !name || !surname || !nickname) {
        return res.json({ error_msg: 'Debe rellenar todos los campos obligatorios' })
    }
    if(nickname.length < 6) {
        return res.json({ error_msg: 'El nombre de usuario debe tener por lo menos 6 caracteres' })
    }
    if(password.length < 6) {
        return res.json({ error_msg: 'La contraseña debe tener al menos 6 caracteres' })
    }
    if(password !== password2){
        return res.json({ error_msg: 'Las contraseñas deben coincidir'  })
    }
    if(name.length < 3) {
        return res.json({ error_msg: 'Tu nombre no puede tener menos de 3 caracteres' })
    }
    if(surname.length < 3) {
        return res.json({ error_msg: 'Tu apellido no puede tener menos de 3 caracteres' })
    }
    const CheckNickname = await User.findOne({ nickname: nickname })
    if(!CheckNickname){
        const CheckEmail = await User.findOne({ email: email })
        if(!CheckEmail) {
            const newUser = await new User({ email, password, password2, name, surname, nickname, avatar, role:"user"})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            return res.json({ success_msg: 'Cuenta registrada con éxito!'})
        }
        else {
            return res.json({ error_msg: 'Este email ya se encuentra registrado'})
        }
    }
    else {
        return res.json({ error_msg: 'Este usuario ya se encuentra registrado'})
    }
}

users.logIn = passport.authenticate('local', {
    failureRedirect: '/logIn',
    successRedirect: '/',
    failureFlash: true
})

users.logOut = async (req, res) => {
    req.logout();
    res.json({ success_msg: 'Sesión cerrada correctamente' })
}

users.userInfo = async (req, res) => {
    console.log("revisando req de userInfo", req)
    const {_id, email, nickname, name, surname, favorites } = req.user
    res.json({_id, email, nickname, name, surname, favorites})
}

users.favorites = async (req, res) => {
    console.log(req.body)
    const { productId, productImg, productTitle, productPrice, userId } = req.body
    User.findById(userId, (err, user) => {
        if(err) return err
        if(user.favorites.includes(productId)){
            user.favorites = user.favorites.filter((f) => {
                return !f.equals(productId)
            })    
        }
        else{ 
            user.favorites.push({
                productId,
                productImg,
                productTitle,
                productPrice
            }) 
        }
        user.save((err, user) => {
            if(err) return err
            return res.json(user.favorites)
        })
    })
}

module.exports = users