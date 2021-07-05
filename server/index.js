const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const next = require('next');
require('./database');
require('dotenv').config();
require('./config/passport');


//Settings
const port = process.env.PORT || 3000;
const dev  = process.env.NODE_ENV !== 'production';
const app =  next({ dev });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {

        //Initializations
        const server = express();
        const Index = require('./routes/index.routes')
        
        //Middlewares
        server.use(express.json());
        server.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true,
          }));
        server.use(passport.initialize());
        server.use(passport.session());
        server.use(flash());

        //Global Vars
        server.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
            res.locals.error = req.flash('error');
            res.locals.user = req.user || null;
            next();    
        });

        //Route
        server.use('/api', Index)

        //Settings
         
        server.get('*', (req, res) => {
            return handle(req, res);
        })

        server.listen(3000, err => {
            if(err) throw err;
            console.log(`Now listening at port ${port}`)
        })
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    })