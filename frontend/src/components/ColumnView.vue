<template>
  <div
    class="column"
    @dragover="onDragOver"
    @drop="onDrop"
    :class="{ 'invalid-drop': isInvalidDrop }"
  >
    <h2>{{ column.title }}</h2>
    <div class="task-list">
      <TaskCard v-for="task in tasks" :key="task._id" :task="task" @drag-start="onTaskDragStart" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '../stores/taskStore'
import TaskCard from './TaskCard.vue'
import { ref } from 'vue'
import '../styles/main.scss'

const props = defineProps<{
  column: {
    id: string
    title: string
    status: string
  }
  tasks: Task[]
}>()

const emit = defineEmits<{
  (e: 'task-move', taskId: string, newStatus: string): void
}>()

// Define the column order and their indices
const COLUMN_ORDER = {
  backlog: 0,
  progress: 1,
  test: 2,
  done: 3,
} as const

const isInvalidDrop = ref(false)

const onTaskDragStart = (event: DragEvent, task: Task) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('taskId', task._id)
    event.dataTransfer.setData('fromStatus', task.status)
  }
}

// Helper function to check if a move is valid
const isValidMove = (fromStatus: string, toStatus: string): boolean => {
  const fromIndex = COLUMN_ORDER[fromStatus as keyof typeof COLUMN_ORDER]
  const toIndex = COLUMN_ORDER[toStatus as keyof typeof COLUMN_ORDER]

  // Allow moving to next or previous column only
  return Math.abs(toIndex - fromIndex) === 1
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  isInvalidDrop.value = false

  const taskId = event.dataTransfer?.getData('taskId')
  const fromStatus = event.dataTransfer?.getData('fromStatus')
  const toStatus = props.column.status

  if (taskId && fromStatus && fromStatus !== toStatus && isValidMove(fromStatus, toStatus)) {
    emit('task-move', taskId, toStatus)
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  const fromStatus = event.dataTransfer?.getData('fromStatus')
  const toStatus = props.column.status

  if (fromStatus && fromStatus !== toStatus) {
    if (isValidMove(fromStatus, toStatus)) {
      event.dataTransfer!.dropEffect = 'move'
      isInvalidDrop.value = false
    } else {
      event.dataTransfer!.dropEffect = 'none'
      isInvalidDrop.value = true
    }
  } else {
    isInvalidDrop.value = false
  }
}
</script>

<style scoped>
.column {
  flex: 1;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  min-width: 250px;
  transition: all 0.2s ease;
}

.invalid-drop {
  background: #fee2e2;
  border: 2px dashed #ef4444;
}
</style>
