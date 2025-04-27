<template>
  <div class="board">
    <ColumnView
      v-for="column in columns"
      :key="column.id"
      :column="column"
      :tasks="getTasksByStatus(column.status)"
      @task-move="handleTaskMove"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import ColumnView from './ColumnView.vue'

type TaskStatus = 'backlog' | 'progress' | 'test' | 'done'

interface Column {
  id: string
  title: string
  status: TaskStatus
}

const taskStore = useTaskStore()

const columns: Column[] = [
  { id: '1', title: 'Backlog', status: 'backlog' },
  { id: '2', title: 'Progress', status: 'progress' },
  { id: '3', title: 'Test', status: 'test' },
  { id: '4', title: 'Done', status: 'done' },
]

const getTasksByStatus = (status: TaskStatus) => {
  return taskStore.tasks.filter((task) => task.status === status)
}

const handleTaskMove = (taskId: string, newStatus: TaskStatus) => {
  taskStore.moveTask(taskId, newStatus)
}

onMounted(() => {
  taskStore.fetchTasks()
})
</script>

<style scoped>
.board {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #f0f2f5;
  min-height: 100vh;
}
</style>
