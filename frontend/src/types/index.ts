export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
}

export interface Column {
  id: string
  name: string
  tasks: Task[]
}
