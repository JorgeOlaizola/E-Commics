const mongoose = require('mongoose')
require('dotenv').config()
const { USER_HOST, USER_PASS, USER_DB } = process.env

const MONGODB_URI = `mongodb+srv://${USER_HOST}:${USER_PASS}@cluster0.n17hy.mongodb.net/${USER_DB}?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('Database is connected!!'))
    .catch(err => console.log(err));