import mongoose from 'mongoose'

const { USER_HOST, USER_PASS, USER_DB } = process.env
const MONGODB_URI = `mongodb://${USER_HOST}:${USER_PASS}@cluster0-shard-00-00.n17hy.mongodb.net:27017,cluster0-shard-00-01.n17hy.mongodb.net:27017,cluster0-shard-00-02.n17hy.mongodb.net:27017/${USER_DB}?authSource=admin&replicaSet=atlas-1v5dgy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect