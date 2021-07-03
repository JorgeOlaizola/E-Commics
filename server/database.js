const mongoose = require('mongoose')
require('dotenv').config()
const { USER_HOST, USER_DB } = process.env

const MONGODB_URI = `mongodb://${USER_HOST}/${USER_DB}`

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    userNewUrlParse: true
})
    .then(db => console.log('Database is connected!!'))
    .catch(err => console.log(err));