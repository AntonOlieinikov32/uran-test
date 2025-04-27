import { Request, Response } from 'express'
import Task from '../models/Task'

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error })
  }
}

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.body
    const task = new Task({
      title,
      description,
      status: status || 'backlog',
    })
    const savedTask = await task.save()
    res.status(201).json(savedTask)
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error })
  }
}

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, status } = req.body
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true },
    )
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json(updatedTask)
  } catch (error) {
    res.status(400).json({ message: 'Error updating task', error })
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedTask = await Task.findByIdAndDelete(id)
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.json({ message: 'Task deleted successfully' })
  } catch (error) {
    res.status(400).json({ message: 'Error deleting task', error })
  }
}
