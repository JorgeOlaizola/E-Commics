const mongoose = require('mongoose')
require('dotenv').config()
const { USER_HOST, USER_PASS, USER_DB } = process.env

// const MONGODB_URI = `mongodb+srv://${USER_HOST}:${USER_PASS}@cluster0.n17hy.mongodb.net/${USER_DB}?retryWrites=true&w=majority`

const MONGODB_URI =  `mongodb://${USER_HOST}:${USER_PASS}@cluster0-shard-00-00.n17hy.mongodb.net:27017,cluster0-shard-00-01.n17hy.mongodb.net:27017,cluster0-shard-00-02.n17hy.mongodb.net:27017/${USER_DB}?authSource=admin&replicaSet=atlas-1v5dgy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected!!'))
    .catch(err => console.log(err));
