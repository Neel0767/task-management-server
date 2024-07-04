import express from 'express'
import dotenv from 'dotenv'

import bodyParser from 'body-parser'
import cors from 'cors'

import apiRoutes from './src/routes/api'
import authRoutes from './src/routes/auth'
import projectRoutes from './src/routes/project'
import teamRoutes from './src/routes/team'
import taskRoutes from './src/routes/task'
import errorHandler from './src/middleware/errorHandler'

import apiAuth from './src/middleware/apiAuth'
import db from './src/models'

dotenv.config()
require('./src/config/sequelize')

// db.sequelize.sync({ alter: true })

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())
app.use(bodyParser.json())
app.use('/', apiAuth, apiRoutes)
app.use('/auth', authRoutes)
app.use('/projects', apiAuth, projectRoutes)
app.use('/teams', apiAuth, teamRoutes)
app.use('/tasks', apiAuth, taskRoutes)
app.use(errorHandler)

module.exports = app
