<template>
    <section class="hero">
        <Navbar />
        <div class="hero-img">
            <img src="@/assets/setting-goal.png" alt="">
        </div>
        <div class="hero-text">
            <h3 class="title">ゴールを達成した自分をイメージしよう</h3>
            <button>目標を設定する</button>
        </div>
  </section>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  components: { Navbar },

}
</script>

<style>
.hero {
    height: 480px;
    position: relative;
}
.hero-container {
    height: 100%;
}
.hero-img {
  position: absolute;
  left: 240px;
  top: 120px;
}
.hero-text {
    display: grid;
    justify-items: center;
    align-content: center;
    margin-top: 120px;
}
.hero-text .title {
    margin-bottom: 24px;
}
</style>