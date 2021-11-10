<template>
  <form @submit.prevent="handleSubmit">
      <input type="email" placeholder="email" required v-model="email">
      <input type="password" placeholder="password" required v-model="password">
      <div class="error"> {{ error }} </div>
      <button> Log in</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import useLogin from '../composables/useLogin'
import { app } from '../firebase/config'
import { getAuth } from "firebase/auth"

export default {
    setup (props, context) {
        // ref
        const email = ref('')
        const password = ref('')

        const auth = getAuth()
        const { error, login } = useLogin()

        const handleSubmit = async () => {
            const res = await login(email.value, password.value)
            console.log(res)

            if (!error.value) {
                context.emit('login')
            }
        }
        return { email, password, handleSubmit, error }
    }
}
</script>

<style>

</style>