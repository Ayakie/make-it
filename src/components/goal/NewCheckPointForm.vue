<template>
  <form class="inline-form" @submit.prevent="handleSubmit">
      <DatePicker v-model="checkpointDate" :masks="masks" :model-config="modelConfig"
      class="checkpoint-date">
          <template v-slot="{ inputValue, inputEvents}">
              <input
              :value="inputValue"
              v-on="inputEvents"
              placeholder="2022/01/01"
              required>
          </template>
      </DatePicker> までに
      <input type="text" v-model="newGoal" class="new-goal"
      placeholder="過去問を一周終わらせる" required>
      <div class="error" v-if="dateError"> {{ dateError }} </div>
      <button class="create">登録する</button>
  </form>
</template>

<script>
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import { timestamp } from '@/firebase/config'
import { computed, ref } from '@vue/reactivity'
import { DatePicker } from 'v-calendar'

export default {
    components: { DatePicker },
    setup() {
        const newGoal = ref('')
        const user = getUser()
        const checkpointDate = ref('')

        const { error, _addDoc } = useCollection('checkpoints')

        const handleSubmit = async() => {
            const checkpoint = {
                userId : user.value.uid,
                userName: user.value.displayName,
                goal: newGoal.value,
                completed: false,
                checkpoint: checkpointDate.value,
                completedAt: timestamp(),
                createdAt: timestamp()
            }

            if (newGoal.value.length) {
                const docRef = await _addDoc(checkpoint)
            }
            if (!error.value) {
                newGoal.value= ''
                checkpointDate.value = ''
            }
        }

        const dateError = computed(() => {
            if(checkpointDate.value) {
                const now = new Date()
                return checkpointDate.value.getTime() < now.getTime() ? '途中目標は今日以降に設定しよう' : ''
            }
        })
        
        const modelConfig = {
            timeAdjust: '23:59:59'
        }
        const masks = {
            input: 'YYYY/MM/DD'
        }
        return { newGoal, checkpointDate, handleSubmit, dateError, masks, modelConfig }
    }
}
</script>

<style scoped>
.inline-form input {
    display: inline-block;
    margin-bottom: 0px;
    border: none;
    border-bottom: 0.5px solid #d7d7d7;
}
.checkpoint-date {
    display: inline-block;
    width: 130px;
    margin-right: 16px;
}
</style>