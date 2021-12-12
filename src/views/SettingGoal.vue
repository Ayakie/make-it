<template>
  <div class="modal">
      <h3>目標と達成予定日を設定しよう</h3>
      <p>登録することで、達成日までのカウントダウンが表示されます</p>
      <form @submit.prevent="handleSubmit">
          <div v-if="id" class="current-goal">
              現在の目標：<span class="text">{{ goal }}</span>
          </div>
          <label for="goal">目標</label>
          <input type="text" id="goal" v-model="newGoal" required placeholder="例) 〇〇大学に合格する">
          <label for="goal-date">達成日</label>
          <DatePicker mode="date" v-model="goalDate" :masks="masks" :model-config="modelConfig">
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
          <div class="error" v-if="addError"> {{ addError }}</div>
          <div class="output" v-if="output"> {{output}} </div>
          <button>
            <span v-if="id">
                更新する
            </span>
            <span v-else>
                登録する
            </span>
          </button>
      </form>
      <BackPage />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import useCollection from '@/composables/useCollection'
import setDocument from "@/composables/setDocument"
import getUser from '@/composables/getUser'
import BackPage from '@/components/BackPage.vue'
import { computed, ref } from '@vue/reactivity'
import { timestamp } from '@/firebase/config'
import { DatePicker } from 'v-calendar'

export default {
    components: { BackPage, DatePicker },
    props:['id', 'goal'],
    setup(props, context) {
        const router = useRouter()
        const newGoal = ref('')
        const goalDate = ref('')
        const user = getUser()
        const today = new Date()
        const restSec = ref(null)
        const setError = ref(null)

        const { error:addError, _addDoc } = useCollection('goals')

        const handleSubmit = async () => {
            let goal = {
                userId: user.value.uid,
                userName: user.value.displayName,
                goal: newGoal.value,
                date: goalDate.value,
                createdAt: timestamp()
            }

            if (!addError.value && !dateError.value) {
                if (props.id) {
                    const { error:setError, _updateDoc, _} = setDocument('goals', props.id)
                    let goal = {
                        goal: newGoal.value,
                        date: goalDate.value,
                        createdAt: timestamp()
                    }
                    await _updateDoc(goal)
                } else {
                    const docRef = await _addDoc(goal)
                }
                if (!setError.value && !addError.value) {
                    // console.log('submitted!')
                    router.push({name: 'Home'})
                }
            }
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

        const modelConfig = {
            timeAdjust: '00:00:00'
        }

        const masks = {
            input: 'YYYY/MM/DD'
        }

        return {newGoal, goalDate, handleSubmit, addError,
        dateError, output, dateError, masks, modelConfig }
    }
}
</script>

<style scoped>
.output {
    color: var(--secondary);
    margin-bottom: 16px;
}
.current-goal {
    margin-bottom: 16px;
}
.current-goal > .text{
    font-weight: bold;
}
</style>