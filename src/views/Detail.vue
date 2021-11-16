<template>
  <Navbar />
  <div class="detail" v-if="document">
    <h3>やったことを振り返ろう</h3>
    <form @submit.prevent="handleSubmit">
      <h4>
        {{ document.task }}
      </h4>
      <label for="complete-date">完了日</label>
      <input type="date" id="complete-date" value="2022/11/01">
      <label for="memo">メモ</label>
      <textarea id="memo"></textarea>
      <label for="">タグ (カテゴリ)</label>
      <input type="text" v-model="tag" placeholder="Enter を押して追加">
      <button>完了する</button>
    </form>
    <BackPage />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import BackPage from '@/components/BackPage.vue'
import getDocument from "@/composables/getDocument"

export default {
  components: { Navbar, BackPage },
  props: ['id'],
  setup(props) {
    console.log('props', props.id)
    const { error, document, _getDoc } = getDocument('tasks', props.id)
    _getDoc()

    console.log('document in Detail.vue', document)

    return { error, document }
  }
}
</script>
<style scoped>
.detail {
  text-align: center;
}
input, textarea {
  margin-top: 8px;
}
</style>