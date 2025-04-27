import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import taskRoutes from './routes/taskRoutes'
import { env } from './config/env.config'

function setupMiddleware(app: express.Application) {
  app.use(cors())
  app.use(express.json())
}

function setupRoutes(app: express.Application) {
  app.use('/api/tasks', taskRoutes)
}

function setupDatabase() {
  mongoose
    .connect(env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err))
}

function setupErrorHandling(app: express.Application) {
  app.use((err: Error, req: express.Request, res: express.Response) => {
    console.error(err.stack)
    res.status(500).json({ message: 'Something went wrong!' })
  })
}

async function bootstrap() {
  const app = express()

  setupMiddleware(app)
  setupRoutes(app)

  setupDatabase()

  setupErrorHandling(app)

  app.listen(env.BACKEND_PORT, () => {
    console.log(`Server is running on port ${env.BACKEND_PORT}`)
  })
}

bootstrap()
