<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold mb-8">Trello Clone</h1>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="md:col-span-1">
          <AddTaskForm />
        </div>
        <div class="md:col-span-3">
          <BoardView />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BoardView from './components/BoardView.vue'
import AddTaskForm from './components/AddTaskForm.vue'
</script>
