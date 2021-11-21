<template>
  <form class="new-task">
      <textarea
      placeholder="Enter を押して新規作成"
      v-model="newTask"
      @keypress.enter.prevent="handleEnter">
      </textarea>
      <div class="error"> {{ error }} </div>
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

    const handleEnter = async() => {
      const task = {
        userId: user.value.uid,
        userName: user.value.displayName,
        task: newTask.value,
        tags:[],
        completed: false,
        createdAt: timestamp()
      }
      
      if (newTask.value.length) {
        const docRef = await _addDoc(task)
      }
      if (!error.value) {
        newTask.value = ''
      }
    }

    return { newTask, handleEnter, error }
  }
}
</script>

<style>
.new-task {
  padding: 16px;
  border-radius: 4px;
  max-width: 600px;
}
.new-task textarea {
  text-align: center;
  margin: 0 auto;
  padding: 0 10px;
  border: none;
}
</style>