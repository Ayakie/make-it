<template>
  <header>
      <div class="header-container">
          <div class="site"></div>
          <div class="nav-login">
              <p>ようこそ、{{}} さん</p>
              <button @click="handleLogout">Logout</button>
          </div>
      </div>
  </header>
</template>

<script>
import useLogout from '../composables/useLogout'

export default {
    setup() {
        const { error, logout } = useLogout()
        
        const handleLogout =  async () => {
            await logout()
            if (!error.value) {
                console.log('user logged out')
            }
        }

        return { error, handleLogout}
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