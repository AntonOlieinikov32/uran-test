import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Task {
  _id: string
  title: string
  description: string
  status: 'backlog' | 'progress' | 'test' | 'done'
  createdAt: string
  updatedAt: string
}

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Use localhost in browser, backend service name in Docker
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

  const fetchTasks = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/tasks`)
      if (!response.ok) throw new Error('Failed to fetch tasks')
      tasks.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching tasks:', err)
    } finally {
      loading.value = false
    }
  }

  const addTask = async (title: string, description: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, status: 'backlog' }),
      })
      if (!response.ok) throw new Error('Failed to create task')
      const newTask = await response.json()
      tasks.value.push(newTask)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error creating task:', err)
    } finally {
      loading.value = false
    }
  }

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update task')
      const updatedTask = await response.json()
      const index = tasks.value.findIndex((t) => t._id === taskId)
      if (index !== -1) {
        tasks.value[index] = updatedTask
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error updating task:', err)
    } finally {
      loading.value = false
    }
  }

  const moveTask = async (taskId: string, newStatus: Task['status']) => {
    return updateTask(taskId, { status: newStatus })
  }

  const deleteTask = async (taskId: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete task')
      tasks.value = tasks.value.filter((t) => t._id !== taskId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error deleting task:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    moveTask,
    deleteTask,
  }
})
