const http = require('http')
const express = require('express')
const app = express()
require('express-async-errors')
var _ = require('lodash')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const logger = require('./utils/logger')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Cant connect to MongoDB')
  })

// MIDDLEWARE ZONE
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app