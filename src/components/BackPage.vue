<template>
    <div class="back" @click="backPage">
        <span class="material-icons back">arrow_back_ios</span>
        <span class="back-text">戻る</span>
    </div>
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

<style scoped>
.material-icons.back {
    vertical-align: middle;
}
.back {
    display: inline-block;
    cursor: pointer;
    color: #3D566F;
}
.back:hover {
    opacity: 0.6;
}
.back-text {
    vertical-align: middle;
}
</style>