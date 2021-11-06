<template>
  <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="your name" required v-model="name">
      <input type="email" placeholder="email" required v-model="email">
      <input type="password" placeholder="password" required v-model="email">
      <div class="error"> {{ error }} </div>
      <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup () {
        //ref
        const name = ref('')
        const email = ref('')
        const password = ref('')

        const handleSubmit = () => {

        }
        return { name, email, password, handleSubmit }
    }
}
</script>

<style>

</style>