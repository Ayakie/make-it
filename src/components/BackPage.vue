<template>
    <slot>
        <div class="back" @click="backPage">
            <span class="material-icons back">arrow_back_ios</span>
            <span class="back-text">戻る</span>
        </div>
    </slot>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    setup(){
        const router = useRouter()
        const backPage = () => {
            router.go(-1)
        }
        return { backPage }
    }
 }
</script>

<style>
.back {
    display: inline-block;
    cursor: pointer;
}
.back:hover {
    opacity: 0.6;
}
.back-text {
    vertical-align: middle;
    color: var(--main2);
}
</style>