<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Edit Task</h2>
      <form @submit.prevent="submitEdit">
        <div class="form-group">
          <label for="edit-title">Title</label>
          <input id="edit-title" v-model="editedTitle" required />
        </div>
        <div class="form-group">
          <label for="edit-description">Description</label>
          <textarea id="edit-description" v-model="editedDescription" rows="3" />
        </div>
        <div class="actions">
          <button type="button" @click="$emit('close')">Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Task } from '../stores/taskStore'
import { useTaskStore } from '../stores/taskStore'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits(['close'])
const taskStore = useTaskStore()

const editedTitle = ref(props.task.title)
const editedDescription = ref(props.task.description)

watch(
  () => props.task,
  (newTask) => {
    editedTitle.value = newTask.title
    editedDescription.value = newTask.description
  },
)

const submitEdit = async () => {
  await taskStore.updateTask(props.task._id, {
    title: editedTitle.value,
    description: editedDescription.value,
  })
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  min-width: 320px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
}
form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
input,
textarea {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  background: #fafbfc;
  color: #222;
}
input:focus,
textarea:focus {
  outline: none;
  border-color: #4f8cff;
  background: #fff;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
}
button[type='submit'] {
  background: #4f8cff;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
button[type='submit']:hover {
  background: #2563eb;
}
button[type='button'] {
  background: none;
  border: none;
  color: #222;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  transition: background 0.2s;
}
button[type='button']:hover {
  background: #f3f4f6;
}
</style>
