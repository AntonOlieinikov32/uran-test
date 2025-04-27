import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import taskRoutes from './routes/taskRoutes'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/tasks', taskRoutes)

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/task-manager'

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
