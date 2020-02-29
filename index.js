const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('express-async-errors')

const routers = require('./routes/index.router')
const { errorMiddleware } = require('./middlewares')
const { env } = require('./config')

mongoose.connect(`mongodb://db`, {
  user: env.DATABASE_USERNAME,
  pass: env.DATABASE_PASSWORD,
  dbName: env.DATABASE_NAME,
  useNewUrlParser: true,
  useFindAndModify: true
}, err => {
  if (err) {
    console.log(err.stack)
    console.log('error connecting with database ', err.message)
    // process.exit(0)
  }
})

const app = express()
app.use(helmet())
app.use(bodyParser.json())

app.use('/', routers)

app.use(errorMiddleware)

app.listen(env.PORT, err => {
  if (err) {
    console.log(`error launching server ${err.message}`)
    process.exit(0)
  }
  console.log(`server running on port ${env.PORT}`)
})
