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
      <textarea id="memo" placeholder=""
      v-model="memo">
      </textarea>
      <label for="">タグ (カテゴリ)</label>
      {{tagsSet}}
      <input class="input-tag" type="text" placeholder="Enter を押して追加"
      v-model="tag" @keypress.enter.prevent="handleEnterTag">
      <div class="tag" v-for="_tag in tagsList" :key="_tag">
        <span class="material-icons clear" @click="handleClear(_tag)">clear</span>
        #{{ _tag }}
      </div>
      <div class="complete-button">
        <button>完了する</button>
      </div>
    </form>
    <BackPage />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import BackPage from '@/components/BackPage.vue'
import getDocument from "@/composables/getDocument"
import { computed, ref } from '@vue/reactivity'
import { DatePicker } from 'v-calendar'

export default {
  components: { Navbar, BackPage, DatePicker },
  props: ['id', 'tagsSet'],
  setup(props) {
    const { error, document, _getDoc } = getDocument('tasks', props.id)
    _getDoc()
    const tag = ref('')
    const memo = ref('')
    // for suggenstion of tag
    const tagsSet = props.tagsSet
    const tagsList = ref([])


    const handleEnterTag = () => {
      if(!tagsList.value.includes(tag.value)) {
        tagsList.value.push(tag.value)
      }
        tag.value = ''
    }

    const handleClear = (_tag) => {
      tagsList.value.pop(_tag)
    }

    const showTag = computed(() => {

    })

    return { error, document, memo, tag, handleEnterTag, tagsList, handleClear }
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
.tag {
  display: inline-block;
  margin: 0 8px;
  padding: 8px 16px;
  border-radius: 20px;
  background: #F2F2F2;
  color: var(--secondary);

}
.input-tag {
  margin-bottom: 8px;
}
.complete-button {
  margin-top: 24px;
}
.clear {
  font-size: 18px;
  vertical-align: middle;
  padding-bottom: 1px;
}
</style>