<template>
    <section class="hero">
        <div class="hero-container">
        <div class="hero-img">
            <img src="@/assets/setting-goal.png" alt="">
        </div>
        <h3 class="title">ゴールを達成した自分をイメージしよう</h3>
        <router-link :to="{name: 'SettingGoal'}">
            <button>目標を設定する</button>
        </router-link>
        </div>
  </section>
</template>

<script>

export default {
}
</script>

<style>
.hero {
    height: 480px;
    position: relative;
    /* background-image: url('../../assets/setting-goal.png');
    background-position: 20%;
    background-repeat: no-repeat; */
}
.hero-container {
    display: grid;
    justify-items: center;
    align-content: center;
    height: 100%;
}
.hero-img {
  position: absolute;
  left: max(15vw, 120px);
  top: 10%;
  z-index: -1;
}
.title {
    margin-bottom: 24px;
}

/* smartphone */
@media (max-width: 768px) {
    .hero-img {
        left: 20px;
        filter: opacity(70%);
    }
}
</style>