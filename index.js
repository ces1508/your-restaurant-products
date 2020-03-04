const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')

require('express-async-errors')

const apolloConfig = require('./graphql/index')
const routers = require('./routes/index.router')
const { errorMiddleware } = require('./middlewares')
const { env } = require('./config')

mongoose.connect('mongodb://db', {
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

const graphqlServer = new ApolloServer({
  context: ({ req }) => {
    const auth = req.headers && req.headers.authorization || ''
    if (!auth) return { user: null }
    return {
      user: {
        email: 'ces1508@gmail.com',
        name: 'christian',
        lastName: 'segura'
      }
    }
  },
  ...apolloConfig
})

const app = express()
app.use(helmet())
app.use(bodyParser.json())

graphqlServer.applyMiddleware({ app, path: '/graphql' })
app.use('/', routers)

app.use(errorMiddleware)

app.listen(env.PORT, err => {
  if (err) {
    console.log(`error launching server ${err.message}`)
    process.exit(0)
  }
  console.log(`server running on port ${env.PORT}`)
})
