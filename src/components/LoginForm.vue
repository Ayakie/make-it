<template>
  <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="email" required v-model="email">
      <input type="password" placeholder="password"  required v-model="password">
      <div class="error"> {{ error }} </div>
      <button> Log in</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup () {
        // ref
        const email = ref('')
        const password = ref('')

        const handleSubmit = () => {

        }
        return { email, password, handleSubmit }
    }
}
</script>

<style>

</style>