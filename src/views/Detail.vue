<template>
  <Navbar />
  <div class="detail" v-if="document">
    <h3>やったことを振り返ろう</h3>
    <form @submit.prevent="handleSubmit">
      <h4 class="task-name">
        {{ document.task }}
      </h4>
      <label for="complete-date">完了日</label>
      <DatePicker mode="date" id="complete-date" v-model="completedAt" :masks="masks">
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
      <input class="input-tag" type="text" placeholder="Enter を押して追加"
      v-model="tag" @keypress.enter.prevent="handleEnterTag">
      <div class="tag" v-for="_tag in document.tags" :key="_tag">
        <span class="material-icons clear" @click="handleClear(_tag)">clear</span>
        #{{ _tag }}
      </div>
      <div>
        <button class="complete-button">完了する</button>
        <div class="save">
          <span class="material-icons save-icon">border_color</span>
          一時保存する
        </div>
      </div>
    </form>
    <BackPage />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import BackPage from '@/components/BackPage.vue'
import getDocument from "@/composables/getDocument"
import setDocument from "@/composables/setDocument"
import { computed, ref } from '@vue/reactivity'
import { DatePicker } from 'v-calendar'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'

export default {
  components: { Navbar, BackPage, DatePicker },
  props: ['id', 'tagsSet'],
  setup(props) {
    const router = useRouter()
    const { error: taskError, document, _getDoc } = getDocument('tasks', props.id)
    const { error: setError, updateDoc } = setDocument('tasks', props.id)
    const memo = ref([])
    const completedAt = ref(new Date())

    const setupValue = (async() => {
      await _getDoc()
      console.log('document.value: ', document.value)
      memo.value = document.value.memo
      if (document.value.completedAt) {
        completedAt.value = document.value.completedAt.toDate()
      }
    })()

    const tag = ref('')
    // for suggenstion of tag
    const tagsSet = props.tagsSet
    // document is null at this moment
    // console.log('document.value: ', document.value)
    const tagsList = ref([])
    onMounted(() => console.log('mounted!'))

    const handleEnterTag = async () => {
      tagsList.value = await document.value.tags
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

    const handleSubmit = async () => {
      const data = {
        tags: tagsList.value,
        complete: true,
        memo: memo.value,
        completedAt: completedAt.value
      }
      await updateDoc(data)
      
      router.push({ name: 'Home'})
    }

    return { taskError, document, memo, tag, handleEnterTag, handleClear, handleSubmit, completedAt }
  },
  data() {
    return {
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
  margin: 4px 8px;
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
.save {
  cursor: pointer;
  vertical-align: middle;
  /* display: inline-block; */
  color: #3D566F;
  font-size: 14px;
  margin-top: 16px;
}
.save:hover {
  opacity: 0.6;
}
.save-icon {
  font-size: 14px;
  vertical-align: middle;
}
</style>