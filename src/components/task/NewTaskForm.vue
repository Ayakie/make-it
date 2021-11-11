<template>
  <form class="new-task">
      <textarea id="" cols="30"
      placeholder="Enter を押して新規作成"
      v-model="newTask"
      @keypress.enter.prevent="handleEnter">
      </textarea>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'

export default {
  setup() {
    const newTask = ref('')

    const user = getUser()

    const handleEnter = async() => {
      const task = {
        userId: user.value.uid,
        userName: user.value.displayName,
        task: newTask.value,
        createdAt: timestamp()
      }
      console.log(task)
      newTask.value = ''
    }

    return { newTask, handleEnter }
  }
}
</script>

<style>
.new-task {
  padding: 20px 16px;
}
.new-task textarea {
  text-align: center;
  margin: 0 auto;
  padding: 0 10px;
  border: none;
}
</style>