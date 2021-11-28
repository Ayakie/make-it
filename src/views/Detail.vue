<template>
  <div class="detail" v-if="document">
    <h3>やったことを振り返ろう</h3>
    <form>
      <label for="">タイトル</label>
      <input type="text" class="task-name" v-model="title">
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
      <label for="memo">メモや思ったことを残そう
        <span class="error">{{ setError }}</span>
      </label>
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
      <!-- if finished -->
      <div v-if="isCompleted">
        <button @click.prevent="handleUnfinish">
          <span class="material-icons finish">unpublished</span>
          <span class="text">やることに戻す</span>
        </button>
        <div class="btn-container">
          <div class="delete-btn" @click.prevent="handleDelete">
            <span class="material-icons finish">delete</span>
            削除する
          </div>
          <div class="save-btn" @click.prevent="handleUpdate">
            <span class="material-icons save">border_color</span>
            更新する
          </div>
        </div>
      </div>
      <!-- if unfinished -->
      <div v-else>
        <button class="complete-btn" @click.prevent="handleSubmit">
         <span class="material-icons finish">task_alt</span>
         <span class="text">やることを完了する</span>
          </button>
        <div class="save-btn" @click.prevent="handleSave">
          <span class="material-icons save">border_color</span>
          一時保存する
        </div>
      </div>
    </form>
    <BackPage />
  </div>
</template>

<script>
import BackPage from '@/components/BackPage.vue'
import getDocument from "@/composables/getDocument"
import setDocument from "@/composables/setDocument"
import { computed, ref } from '@vue/reactivity'
import { DatePicker } from 'v-calendar'
import { useRouter } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import { timestamp } from '@/firebase/config'
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { projectFirestore } from '../firebase/config'

export default {
  components: { BackPage, DatePicker },
  props: ['id', 'tagsSet', 'isCompleted'],
  setup(props) {
    const router = useRouter()
    const { error: taskError, document, _getDoc } = getDocument('tasks', props.id)
    const { error: setError, _updateDoc, _deleteDoc } = setDocument('tasks', props.id)
    const memo = ref(null)
    const completedAt = ref(new Date())
    const tags = ref([])
    const title = ref('')

    const setupValue = (async() => {
      await _getDoc()
      console.log('document.value: ', document.value)
      memo.value = document.value.memo
      title.value = document.value.task
      if (document.value.completedAt) {
        completedAt.value = document.value.completedAt.toDate()
      }
      if (document.value.tags) {
        tags.value = document.value.tags
      }
    })()

    const tag = ref('')
    // for suggenstion of tag
    const tagsSet = props.tagsSet
    // document is null at this moment
    // console.log('document.value: ', document.value)
    onMounted(() => console.log('mounted!'))

    const handleEnterTag =  () => {
      // tags.value = await document.value.tags
      if(!tags.value.includes(tag.value)) {
        tag.value = tag.value.replace(/\s/, '') // replace all whitespace
        tags.value.push(tag.value)
      }
      tag.value = ''
    }

    const handleClear = (_tag) => {
      const idx = tags.value.indexOf(_tag)
      tags.value.splice(idx, 1)
    }

    const handleSave = async() => {
      setError.value = ''
      const data = {
        task: title.value,
        completed: false,
        tags: tags.value,
        memo: memo.value,
        completedAt: completedAt.value
      }
      await _updateDoc(data)
      if (!setError.value) {
        router.push({ name: 'Home'})
      }
    }

    const handleSubmit = async () => {
      const data = {
        task: title.value,
        completed: true,
        tags: tags.value,
        memo: memo.value,
        completedAt: completedAt.value
      }
      await _updateDoc(data)
      if (!setError.value) {
        router.push({ name: 'Home' })
      }
    }

    const handleUnfinish = async () => {
      const data = {
        completed: false,
        task: title.value,
        tags: tags.value,
        memo: memo.value,
        completedAt: completedAt.value,
        createdAt: timestamp()
        }
      await _updateDoc(data)
      if (!setError.value) {
        router.push({ name: 'Home' })
      }
    }

    const handleDelete = async () => {
      await _deleteDoc()
      if (!setError.value) {
        router.push({ name: 'Home' })
      }
    }

    const handleUpdate = async () => {
      const data = {
        completed: true,
        task: title.value,
        tags: tags.value,
        memo: memo.value,
        completedAt: completedAt.value,
        createdAt: timestamp()
        }
      await _updateDoc(data)
      if (!setError.value) {
        router.push({ name: 'Home' })
      }
    }

    return { title, setError, document, memo, tag, handleEnterTag, handleClear, handleSubmit, completedAt, handleSave, handleUnfinish, handleDelete, handleUpdate }
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
  font-weight: bold;
  /* margin-bottom: 24px; */
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
.btn-container {
  display: flex;
  justify-content: center;
}
button {
  margin: auto;
  margin-top: 24px;
  display: block;
}
button .text {
  vertical-align: middle;
}
.material-icons.finish {
  color: var(--main2);
  margin-right: 4px;
}
.clear {
  font-size: 18px;
  padding-bottom: 1px;
}
.material-icons.save {
  color: var(--main2);
  font-size: 14px;
  margin-right: 4px;
}
.save-btn, .delete-btn {
  cursor: pointer;
  margin-top: 16px;
  margin-right: 16px;
}
.save-btn:hover, .delete-btn:hover {
  opacity: 0.6;
}
</style>