Jorge Olaizola
#7289

Jorge Olaizola — 12/07/2021
Estas?
MatiasCavallo — 12/07/2021
si
Jorge Olaizola — 12/07/2021
me meto al meet dell stand
MatiasCavallo — 12/07/2021
dale
MatiasCavallo — 13/07/2021
app.get('/api/users/me',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });
creo que esto dice elena
Jorge Olaizola — 13/07/2021
Eso es para desloguear me parece
MatiasCavallo — 13/07/2021
http://www.passportjs.org/docs/downloads/html/
Passport.js
Documentation

https://stackoverflow.com/questions/11784233/using-passportjs-how-does-one-pass-additional-form-fields-to-the-local-authenti
Stack Overflow
Using PassportJS, how does one pass additional form fields to the l...
I'm using passportJS and I'm wanting to supply more than just req.body.username and req.body.password to my authentication strategy (passport-local).

I have 3 form fields: username, password, &am...

Jorge Olaizola — 13/07/2021
Arrancate el meet cuando quieras
Jorge Olaizola — 13/07/2021
Ya estoy waiting
Hola?
Jorge Olaizola
 ha iniciado una llamada que ha durado unos segundos.
 — 13/07/2021
MatiasCavallo — 13/07/2021
menos mal que no estaba mica
Jorge Olaizola — 13/07/2021
sos un hijo de puta
casi me estallo enfrente de todos
MatiasCavallo — 13/07/2021
passReqToCallback: true
Jorge Olaizola
 ha iniciado una llamada que ha durado una hora.
 — 13/07/2021
MatiasCavallo — 13/07/2021
https://github.com/zachgoll/express-session-authentication-starter/blob/master/config/database.js
GitHub
zachgoll/express-session-authentication-starter
A basic authentication scheme with Express, MongoDB, and Passport Local Strategy - zachgoll/express-session-authentication-starter

MatiasCavallo — 13/07/2021
app.use(
    session({
        secret: 'story book',
        resave: false,
        saveUninitialized: false,
        store: MongoDbStore.create({
            mongoUrl: YourDatabaseURL
        })
    })
);
const MongoDBStore = require('connect-mongodb-session')(session);

//sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUnitialized: false,
    store: new MongoDBStore({
        mongooseConnection: mongoose.connection
    })
    //cookie: { secure: true }
}))

const store = new MongoStore({
    uri: 'your mongo uri' ,
    collection:'mySessions'
})

//express middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: store

// Don't create a session until something is stored 
// cookie: { secure: true } - this wont work without https
}))
MatiasCavallo — 13/07/2021
https://www.youtube.com/watch?v=W5Tb1MIeg-I
YouTube
Tyler Potts
Build a Login System in NodeJS with Passport.js Authentication | A ...

MatiasCavallo — 13/07/2021
https://www.youtube.com/watch?v=Y2ec4KQ7mP8&t=673s
YouTube
Conor Bailey
Implementing Google Authentication With Node JS

Jorge Olaizola — ayer a las 12:51
que tas comiteando?
Jorge Olaizola — ayer a las 13:04
hola?
MatiasCavallo — ayer a las 13:04
estamos en un meet
https://meet.google.com/mse-tzft-tvd
Meet
Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers.

Jorge Olaizola — ayer a las 16:54
Voy entrando
MatiasCavallo — ayer a las 16:55
oki
MatiasCavallo — ayer a las 17:09
me la mande jaja
agus me tiro de hacer pair programing
Jorge Olaizola — ayer a las 17:14
ahora?
MatiasCavallo — ayer a las 17:14
despues del stand
Jorge Olaizola — ayer a las 17:14
oka
MatiasCavallo — ayer a las 17:14
para hcaer lo del back
Jorge Olaizola — ayer a las 22:02
Estas?
MatiasCavallo — ayer a las 22:14
En 10
MatiasCavallo — ayer a las 22:24
voy a tardar mas de 10 jaja termino de comer y estoy tenemos que hacer lo de tips
MatiasCavallo — ayer a las 22:52
estoy
Jorge Olaizola
 ha iniciado una llamada que ha durado una hora.
 — ayer a las 23:44
MatiasCavallo — hoy a las 0:50
var d1 = new Date();
var d2 = new Date(d1);

console.log(d1 == d2);   // prints false (wrong!) 
console.log(d1 === d2);  // prints false (wrong!)
console.log(d1 != d2);   // prints true  (wrong!)
console.log(d1 !== d2);  // prints true  (wrong!)
console.log(d1.getTime() === d2.getTime());
Jorge Olaizola — hoy a la 1:09
import jwt from 'jsonwebtoken'
import nextConnect from 'next-connect'
import User from '../../../server/models/User'
import Token from '../../../server/models/Token'
import { validateToken } from '../../../utils/auth'

Expandir
logIn.js
3 KB
Jorge Olaizola — hoy a las 12:36
Tengo que hacer algo?
Tipo ya?
O estamos tranqui?
MatiasCavallo — hoy a las 12:57
Estamos tranki después de la daily nos metemos a terminar lo del user y tmb si pueden sumar el carrito de compras
Jorge Olaizola — hoy a las 13:12
De una
Jorge Olaizola — hoy a las 15:03
import jwt from 'jsonwebtoken'
import nextConnect from 'next-connect'
import User from '../../../server/models/User'
import Token from '../../../server/models/Token'
import { validateToken } from '../../../utils/auth'

const KEY = 'top_secret'

export default nextConnect()

  .post(async (req, res) => {
    const { email, password } = req.body

    //Previous verifications
    if(!email) return res.json({ error_msg: 'Es necesario que ingrese un email' })
    if(!password) return res.json({ error_msg: 'Es necesario que ingrese una contraseña' })

    //Asking DB if the user exists
    const user = await User.findOne({ email })

    if(!user) return res.json({ error_msg: 'El usuario es inválido' })

    if(user) {

        //Asking DB if password match
        const match = await user.matchPassword(password)
        if(!match) {
            return res.json({ error_msg: 'La contraseña es incorrecta' })
        }

        //Valid credentials
        else {
            //New token
            const token = jwt.sign({ id: user._id }, KEY)
            
            //Verify if this user already have a token
            const verifyToken = await Token.find({}).where({ user: user._id })
            console.log(verifyToken)
            if(verifyToken.length) {
                await Token.findOneAndUpdate({ user: user._id }, { token: token })
            }
            //If there is no token for this user in the DB, we create one
            else {
                await Token.create({ token: token, user: user._id})
            }
            return res.json({ 
                success_msg: 'Usted se ha logueado con éxito!',
                user: {
                    avatar: user.avatar,
                    nickname: user.nickname,
                    email: user.email,
                    name: user.name,
                    surname: user.surname
                    // favorites: user.favorites,
                },
                token: token
            })
        }
    }
  })

  .get(async (req, res, next) => {
    const verification = await validateToken(req.query.token)
    if(!verification) return res.send('Para ingresar aquí debes estar logueado')
    next()
  })

  .get(async (req, res, next) => {
      res.send('De esta manera se usan los middlewares')
  })
Contraer
logIn.js
3 KB
import nextConnect from 'next-connect'
import User from '../../../server/models/User'


export default nextConnect()

Expandir
signUp.js
2 KB
import Token from '../server/models/Token'

export const validateToken = async (token) => {
    const match = await Token.find({ token: token })
    if(match.length) return true
    else return false
Expandir
auth.js
1 KB
﻿
import nextConnect from 'next-connect'
import User from '../../../server/models/User'


export default nextConnect()

.post( async (req, res) => {
    const { name, surname, password, password2, nickname, email, avatar } = req.body

    //Validations
    if( !name || !surname || !password || !password2 || !nickname || !email || !avatar) return res.json({ error_msg: 'Hay campos sin completar' })
    if( nickname.length < 6 ) return res.json({ error_msg: 'El nickname debe tener al menos 6 caracteres' })
    if( password !== password2 ) return res.json({ error_msg: 'Las contraseñas no coinciden' })
    if( password.length < 8) return res.json({ error_msg: 'La contraseña debe tener al menos 8 caracteres' })

    //Verify nickname and email are available
    const testEmail = await User.find({ email })
    if(testEmail.length) return res.json({ error_msg: 'El email ya se encuentra registrado' })
    const testNickname = await User.find({ nickname })
    if(testNickname.length) return res.json({ error_msg: 'El nickname se encuentra en uso' })

    //Creating the user in the DB
    const newUser = new User({ name, surname, password, nickname, email, avatar, role:'user' })
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save()
    return res.json({ success_msg: 'Bienvenido a E-Commics! El registro se ha realizado con éxito'})
})