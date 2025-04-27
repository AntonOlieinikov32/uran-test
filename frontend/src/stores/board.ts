import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Task {
  id: string
  title: string
  description: string
  status: 'backlog' | 'progress' | 'test' | 'done'
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
}

export interface Board {
  id: string
  title: string
  columns: Column[]
}

export const useBoardStore = defineStore('board', () => {
  const board = ref<Board>({
    id: '1',
    title: 'Project Board',
    columns: [
      {
        id: '1',
        title: 'Backlog',
        tasks: [
          {
            id: '1',
            title: 'Task 1',
            description: 'Description for task 1',
            status: 'backlog',
          },
        ],
      },
      {
        id: '2',
        title: 'Progress',
        tasks: [
          {
            id: '2',
            title: 'Task 2',
            description: 'Description for task 2',
            status: 'progress',
          },
        ],
      },
      {
        id: '3',
        title: 'Test',
        tasks: [
          {
            id: '3',
            title: 'Task 3',
            description: 'Description for task 3',
            status: 'test',
          },
        ],
      },
      {
        id: '4',
        title: 'Done',
        tasks: [
          {
            id: '4',
            title: 'Task 4',
            description: 'Description for task 4',
            status: 'done',
          },
        ],
      },
    ],
  })

  const moveTask = (taskId: string, fromColumnId: string, toColumnId: string) => {
    const fromColumn = board.value.columns.find((column) => column.id === fromColumnId)
    const toColumn = board.value.columns.find((column) => column.id === toColumnId)

    if (!fromColumn || !toColumn) return

    const taskIndex = fromColumn.tasks.findIndex((task) => task.id === taskId)
    if (taskIndex === -1) return

    const [task] = fromColumn.tasks.splice(taskIndex, 1)
    task.status = toColumn.title.toLowerCase() as Task['status']
    toColumn.tasks.push(task)
  }

  const addTask = (title: string, description: string) => {
    const backlogColumn = board.value.columns.find((column) => column.title === 'Backlog')
    if (!backlogColumn) return

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'backlog',
    }

    backlogColumn.tasks.push(newTask)
  }

  return {
    board,
    moveTask,
    addTask,
  }
})
