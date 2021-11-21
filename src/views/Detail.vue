<template>
  <Navbar />
  <div class="detail" v-if="document">
    <h3>やったことを振り返ろう</h3>
    <form @submit.prevent="handleSubmit">
      <h4 class="task-name">
        {{ document.task }}
      </h4>
      <label for="complete-date">完了日</label>
      <DatePicker mode="date" id="complete-date" v-model="date" :masks="masks">
        <template v-slot="{ inputValue, inputEvents }">
          <input
          id="complete-date"
          :value="inputValue"
          v-on="inputEvents"
          required
          >
        </template>
      </DatePicker>
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
import { ref } from '@vue/reactivity'
import { DatePicker } from 'v-calendar'

export default {
  components: { Navbar, BackPage, DatePicker },
  props: ['id'],
  setup(props) {
    console.log('props', props.id)
    const { error, document, _getDoc } = getDocument('tasks', props.id)
    _getDoc()

    let today = new Date().getDate()
    const date = ref(new Date())

    return { error, document }
  },
  data() {
    return {
      date: new Date(),
      masks: {
        input: 'YYYY/MM/DD'
      }
    }
  }
}
</script>
<style scoped>
.task-name {
  margin-bottom: 24px;
}
.detail {
  text-align: center;
}
input, textarea {
  margin-top: 8px;
}
</style>