const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const next = require('next');
require('./database');
require('dotenv').config();


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
        server.use(flash())

        //Global Vars
        server.use((req, res, next) => {
            res.locals.success_msg = req.flash('success_msg');
            res.locals.error_msg = req.flash('error_msg');
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