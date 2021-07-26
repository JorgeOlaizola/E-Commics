

module.exports = {
  reactStrictMode: true,
  env:{
    CLOUDINARY_PRESET: "pxwajoby",
    MONGODB_URI: 'mongodb://admin-ecommics:kj9RZdNdYjrmMeWO@cluster0-shard-00-00.n17hy.mongodb.net:27017,cluster0-shard-00-01.n17hy.mongodb.net:27017,cluster0-shard-00-02.n17hy.mongodb.net:27017/ecommics?authSource=admin&replicaSet=atlas-1v5dgy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    CLOUDINARY_URL  : "https://api.cloudinary.com/v1_1/ddrhpcrzz/image/upload",
    ABSOLUTE_URL: "http://localhost:3000/api",
    JWT_SECRET: "top_secret",
    SENDGRID_API_KEY: "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",
    DEFAULT_LOCATION: "60fcbb76160c0709a81a62c1"
  },
  images: {
    domains: ['ecommics.s3.sa-east-1.amazonaws.com'],
  }
}
