<template>
<div class="not-found">
    <h1>404</h1>
    <h2>Not Found...</h2>
    <img :src="url" alt="not-found">

    <div class="back-page">
        <BackPage />
    </div>
</div>

</template>

<script>
import getImgUrl from "@/composables/getImgUrl"
import BackPage from "@/components/BackPage.vue"

export default {
    components: { BackPage },
    setup() {
        const url = getImgUrl(5)
       return { url }
    }

}
</script>

<style scoped>
.not-found {
    margin: 0 auto;
    text-align: center;
}
.not-found img {
    margin: 32px 0;
}
</style>