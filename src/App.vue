<template>
  <div class="content">
    <Navbar />
    <router-view/>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: { Navbar }
}
</script>

<style>
.content {
  margin: auto;
  width: min(92%, 1200px);
}
</style>
