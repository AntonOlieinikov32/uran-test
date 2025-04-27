import { defineStore } from 'pinia'
import type { Column } from '@/types'
import api from '@/services/api'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
}

interface TaskUpdate {
  title?: string
  description?: string
  completed?: boolean
}

export const useBoardStore = defineStore('board', {
  state: () => ({
    columns: [] as Column[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/api/tasks')
        // Transform the tasks into columns
        this.columns = [
          {
            id: 'todo',
            name: 'To Do',
            tasks: response.data.filter((task: Task) => !task.completed),
          },
          {
            id: 'done',
            name: 'Done',
            tasks: response.data.filter((task: Task) => task.completed),
          },
        ]
      } catch (error) {
        this.error = 'Failed to fetch tasks'
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false
      }
    },

    async createTask(title: string, description: string) {
      try {
        const response = await api.post('/api/tasks', { title, description })
        await this.fetchTasks() // Refresh the tasks
        return response.data
      } catch (error) {
        console.error('Error creating task:', error)
        throw error
      }
    },

    async updateTask(id: string, updates: TaskUpdate) {
      try {
        const response = await api.put(`/api/tasks/${id}`, updates)
        await this.fetchTasks() // Refresh the tasks
        return response.data
      } catch (error) {
        console.error('Error updating task:', error)
        throw error
      }
    },

    async deleteTask(id: string) {
      try {
        await api.delete(`/api/tasks/${id}`)
        await this.fetchTasks() // Refresh the tasks
      } catch (error) {
        console.error('Error deleting task:', error)
        throw error
      }
    },

    moveTask(taskId: string, fromColumnId: string, toColumnId: string, toTaskIndex: number) {
      const fromColumn = this.columns.find((col) => col.id === fromColumnId)
      const toColumn = this.columns.find((col) => col.id === toColumnId)

      if (!fromColumn || !toColumn) return

      const taskIndex = fromColumn.tasks.findIndex((task: Task) => task.id === taskId)
      const [task] = fromColumn.tasks.splice(taskIndex, 1)

      // Update task completion status based on column
      const completed = toColumnId === 'done'
      this.updateTask(taskId, { completed })

      toColumn.tasks.splice(toTaskIndex, 0, task)
    },
  },
})
