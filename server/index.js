const express = require('express');
const next = require('next');
require('./database')
require('dotenv').config()


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