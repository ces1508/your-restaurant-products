const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  const pathEnv = path.join(process.cwd(), `.env.${process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development'}`)
  const fileExits = fs.existsSync(pathEnv)
  if (fileExits) {
    dotenv.config({ path: pathEnv })
  } else {
    dotenv.config()
  }
}

module.exports = {
  PORT: process.env.PORT,
  DATABASE_URI: process.env.DATABASE_URI,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME
}
