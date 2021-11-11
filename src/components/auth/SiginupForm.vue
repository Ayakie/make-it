<template>
  <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="your name" required v-model="name">
      <input type="email" placeholder="email" required v-model="email">
      <input type="password" placeholder="password" required v-model="password">
      <div class="error"> {{ error }} </div>
      <button>Sign up</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '../../composables/useSignup'

export default {
    setup (props, context) {
        //ref
        const name = ref('')
        const email = ref('')
        const password = ref('')

        const { error, signup } = useSignup()

        const handleSubmit = async () => {
            const res = await signup(name.value, email.value, password.value)
            console.log(res)

            if (!error.value) {
                context.emit('signup')
            }
        }
        return { name, email, password, handleSubmit, error }
    }
}
</script>

<style>

</style>