<template>
<div class="welcome container">
  <h3>Welcome...</h3>
  <div v-if="showLogin">
    <LoginForm @login="enterHome"/>
    <p>アカウント作成はお済みですか？</p>
    <span @click="showLogin = false">Sign up</span>
  </div>
  
  <div v-else>
      <SignupForm @signup="enterHome"/>
      <p>すでにアカウントを作成済みの場合は</p>
      <span @click="showLogin = true">Log in</span>
  </div>
</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import LoginForm from "../components/auth/LoginForm.vue"
import SignupForm from "../components/auth/SiginupForm.vue"

export default {
    components: { LoginForm, SignupForm },
    setup() {
        const showLogin = ref(true)
        const router = useRouter()

        const enterHome = () => {
            router.push({name: 'Home'})
        }

        return { showLogin, enterHome }
    }
}
</script>

<style>
body {
    background-color: #f2f2f2;
}
.welcome {
    margin: 100px auto;
    text-align: center;
}
.welcome span {
    cursor: pointer;
    color: var(--main2);
}
.welcome span:hover {
    opacity: 0.6;
}
</style>