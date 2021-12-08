<template>
  <form class="inline-form" @submit.prevent="handleSubmit">
      <input type="text" class="input-new-task"
      placeholder="英語の問題を1年分解く"
      v-model="newTask">
      <div class="error"> {{ error }} </div>
    <button class="create-btn gray">作成する</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'

export default {
  setup() {
    const newTask = ref('')

    const user = getUser()

    const { error, _addDoc } = useCollection('tasks')

    const handleSubmit = async() => {
      const task = {
        userId: user.value.uid,
        userName: user.value.displayName,
        task: newTask.value,
        tags:[],
        completed: false,
        createdAt: timestamp(),
        completedAt: timestamp(),
        memo: ""
      }
      
      if (newTask.value.length) {
        const docRef = await _addDoc(task)
      }
      if (!error.value) {
        newTask.value = ''
      }
    }

    return { newTask, handleSubmit, error }
  }
}
</script>

<style>
.new-task textarea {
  text-align: center;
  margin: 0 auto;
  padding: 0 10px;
  border: none;
}
</style>