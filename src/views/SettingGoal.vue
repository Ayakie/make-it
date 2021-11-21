<template>
  <div class="modal">
      <h3>目標と達成予定日を設定しよう</h3>
      <p>登録することで、達成日までのカウントダウンが表示されます</p>
      <form @submit.prevent="handleSubmit">
          <label for="goal">目標</label>
          <input type="text" id="goal" v-model="newGoal" required placeholder="例) 〇〇大学に合格する">
          <label for="goal-date">達成日</label>
          <DatePicker mode="date" v-model="goalDate" :masks="masks">
              <template v-slot="{ inputValue, inputEvents }">
                  <input
                  id="goal-date"
                  :value="inputValue"
                  v-on="inputEvents"
                  placeholder="2021/01/01"
                  required>
              </template>
          </DatePicker>
          <div class="error" v-if="dateError">{{ dateError }}</div>
          <div class="error" v-if="error"> {{ error }}</div>
          <div class="output" v-if="output"> {{output}} </div>
          <button>登録する</button>
      </form>
      <BackPage />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import BackPage from '@/components/BackPage.vue'
import { computed, ref } from '@vue/reactivity'
import { timestamp } from '@/firebase/config'
import { Calendar, DatePicker } from 'v-calendar'

export default {
    components: { BackPage, Calendar, DatePicker },
    setup(props, context) {
        const router = useRouter()
        const newGoal = ref('')
        const goalDate = ref('')
        const user = getUser()
        const today = new Date()
        const restSec = ref(null)

        const { error, _addDoc } = useCollection('goals')

        const handleSubmit = async () => {
            const now = new Date()
            const goal = {
                userId: user.value.uid,
                userName: user.value.displayName,
                goal: newGoal.value,
                date: goalDate.value,
                createdAt: timestamp()
            }

            if (!error.value && !dateError.value) {
                console.log('submitted!')
                const docRef = await _addDoc(goal)
                newGoal.value =''
                router.push({name: 'Home'})
            }
            context.emit('setDate', restSec.value)
        }

        const output = computed(() => {
            if(!dateError.value && goalDate.value) {
                restSec.value = Math.floor((goalDate.value.getTime() - today.getTime()) / 1000)
                const day = Math.floor(restSec.value / 60 / 60 / 24)

                return newGoal.value + 'まで残り ' + day + ' 日です!'
            }
        })

        const dateError = computed(() => {
            if(goalDate.value) {
                const now_= new Date()
                return goalDate.value.getTime() < now_.getTime() ?
                '目標日は明日以降に設定しよう' : ''
            }
        })

        return {newGoal, goalDate, handleSubmit, error, dateError, output, dateError }
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
.modal {
    margin: 100px auto;
    text-align: center;
}
.modal h3 {
    margin-bottom: 8px;
}
.modal p {
    color: var(--secondary);
}
.modal input {
    margin-top: 8px;
}
.output {
    color: var(--secondary);
    margin-bottom: 16px;
}
</style>