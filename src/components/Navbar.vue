<template>
  <header>
      <div class="header-container"  v-if="user">
          <div class="site">
              <router-link :to="{name: 'Home'}">
                  <span class="material-icons home">home</span>
              </router-link>
          </div>
          <div class="nav-login">
              <p>ようこそ、{{ user.displayName }} さん</p>
              <button @click="handleLogout">Logout</button>
          </div>
      </div>
  </header>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
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
    color: var(--secondary);
    display: inline-block;
}
.nav-login button {
    color: var(--secondary);
    background-color: #D7D7D7;
    margin-left: 24px;
}
.material-icons.home {
    font-size: 36px;
}

/* smartphone */
@media (max-width:768px) {
    header {
        font-size:12px;
    }
    .nav-login button {
        margin-left:16px;
    }
}
</style>