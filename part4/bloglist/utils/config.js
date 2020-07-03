require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
if (process.env.NODE_ENV === 'test') {
    MONGODB_URI = process.env.MONGODB_URI_TEST
}


module.exports = {
    PORT, MONGODB_URI
}