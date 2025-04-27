<template>
  <div class="add-task-form">
    <h3 class="text-lg font-semibold mb-4">Add New Task</h3>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          v-model="title"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          v-model="description"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
      </div>
      <button
        type="submit"
        :disabled="taskStore.loading"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ taskStore.loading ? 'Adding...' : 'Add Task' }}
      </button>
      <p v-if="taskStore.error" class="text-red-500 text-sm">{{ taskStore.error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const title = ref('')
const description = ref('')
const taskStore = useTaskStore()

const handleSubmit = async () => {
  await taskStore.addTask(title.value, description.value)
  if (!taskStore.error) {
    title.value = ''
    description.value = ''
  }
}
</script>

<style scoped>
.add-task-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
