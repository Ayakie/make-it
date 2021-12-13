<template>
<div class="not-found">
    <h1>404</h1>
    <h2>Oh...Not Found...</h2>
    <img :src="url" alt="not-found" height="300">

    <div class="back-page">
        <BackPage>
            <div class="back">
                <router-link :to="{name: 'Home'}">
                    <span class="material-icons home">home</span>
                    <span class="back-text">ホームに戻る</span>
                </router-link>
            </div>
        </BackPage>
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

<style>
.not-found {
    margin: 100px auto;
    text-align: center;
}
.not-found img {
    margin: 32px 0;
}
.material-icons.home {
    margin-right: 4px;
}
</style>