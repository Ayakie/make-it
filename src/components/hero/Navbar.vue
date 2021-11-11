<template>
  <header>
      <div class="header-container">
          <div class="site"></div>
          <div class="nav-login" v-if="user">
              <p>ようこそ、{{ user.displayName }} さん</p>
              <button @click="handleLogout">Logout</button>
          </div>
      </div>
  </header>
</template>

<script>
import useLogout from '../../composables/useLogout'
import getUser from '../../composables/getUser'
import { useRouter } from 'vue-router'


export default {
    setup() {
        const { error, logout } = useLogout()
        const router = useRouter()

        const handleLogout =  async () => {
            await logout()
            if (!error.value) {
                console.log('user logged out')
            }

            router.push({ name: 'Welcome' })

        }

        const user = getUser()

        return { error, handleLogout, user}
    }
}
</script>

<style>
header {
    height: 80px;
}
.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.nav-login p {
    color: #8C8C8C;
    display: inline-block;
}
.nav-login button {
    color: #8C8C8C;
    background-color: #D7D7D7;
    margin-left: 20px;
}
</style>