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

</style>