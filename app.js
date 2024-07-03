import express from 'express'
import dotenv from 'dotenv'

import bodyParser from 'body-parser'
import cors from 'cors'

import authRoutes from './src/routes/auth'
import projectRoutes from './src/routes/project'
import errorHandler from './src/middleware/errorHandler'
import db from './src/models'

dotenv.config()
require('./src/config/sequelize')

db.sequelize.sync({ alter: true })

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())
app.use(bodyParser.json())
app.use('/auth', authRoutes)
app.use('/projects', projectRoutes)
app.use(errorHandler)

module.exports = app
