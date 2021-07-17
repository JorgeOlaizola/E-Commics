

module.exports = {
  reactStrictMode: true,
  env:{
    CLOUDINARY_PRESET: "pxwajoby",
    MONGODB_URI: 'mongodb://admin-ecommics:kj9RZdNdYjrmMeWO@cluster0-shard-00-00.n17hy.mongodb.net:27017,cluster0-shard-00-01.n17hy.mongodb.net:27017,cluster0-shard-00-02.n17hy.mongodb.net:27017/ecommics?authSource=admin&replicaSet=atlas-1v5dgy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    CLOUDINARY_URL  : "https://api.cloudinary.com/v1_1/ddrhpcrzz/image/upload",
    ABSOLUTE_URL: "http://localhost:3000/api"
  },
  images: {
    domains: ['ecommics.s3.sa-east-1.amazonaws.com'],
  }
}
