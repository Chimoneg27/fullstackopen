require('express-async-errors')
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authToken = require('./utils/authToken')
const cookieParser = require('cookie-parser')
const logoutRouter = require('./controllers/logout')
app.use(cookieParser())

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', authToken, blogsRouter)
app.use('/api/users', authToken, usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(middleware.getTokenFrom)

module.exports = app