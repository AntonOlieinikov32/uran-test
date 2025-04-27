<template>
  <div class="task-card" draggable="true" @dragstart="onDragStart">
    <h3 class="task-title">{{ task.title }}</h3>
    <p class="task-description">{{ task.description }}</p>
    <div class="task-actions">
      <button @click="openEditModal" class="edit-button">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
      <button @click="handleDelete" class="delete-button">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
  <EditTaskModal v-if="isEditModalOpen" :task="task" @close="closeEditModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '../stores/taskStore'
import EditTaskModal from './EditTaskModal.vue'
import { useTaskStore } from '../stores/taskStore'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'drag-start', event: DragEvent, task: Task): void
}>()

const taskStore = useTaskStore()
const isEditModalOpen = ref(false)

const onDragStart = (event: DragEvent) => {
  emit('drag-start', event, props.task)
}

const openEditModal = () => {
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this task?')) {
    await taskStore.deleteTask(props.task._id)
  }
}
</script>

<style scoped>
.edit-button {
  @apply p-1 text-gray-400 hover:text-blue-500 transition-colors;
}

.delete-button {
  @apply p-1 text-gray-400 hover:text-red-500 transition-colors;
}
</style>
