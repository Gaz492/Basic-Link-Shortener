module.exports = {
    express: {
        port: process.env.expressPort || 3000
    },
    mongodb: {
        URI: process.env.mongoURI || 'mongodb://localhost/urlShortener'
    }
}