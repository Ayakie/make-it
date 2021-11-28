<template>
  <section class="hero">
      <div class="hero-container">
          <div class="hero-img">
              <img src="@/assets/countdown.png" alt="" srcset="">
          </div>
          <h3 class="title">
            {{ goal }} まで残り<br>
            <span class="output days">{{ output['days'] }}</span> 日
            <span class="output">{{ output['hours'] }}</span> 時間
            <span class="output">{{ output['min'] }}</span> 分
            <span class="output">{{ output['sec'] }}</span> 秒
            です！
            </h3>
          <router-link :to="{name: 'SettingGoal', params: {id: id, goal: goal}}">
            <span class="material-icons edit">edit</span>
          </router-link>
      </div>
  </section>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
export default {
  props: ['date', 'goal', 'id'],
  setup(props) {
    const goalDate = props.date
    const goal = props.goal
    const output = ref('')

    const countdown = () => {
      const now = new Date()

      const rest = Math.floor((goalDate.toDate() - now.getTime()) / 1000)
      const sec = rest % 60
      const min = Math.floor(rest / 60) % 60
      const hours = Math.floor(rest / 60 / 60) % 24
      const days = Math.floor( rest / 60 / 60 / 24)

      return [days, hours, min, sec]
      recalc()
    }

    const recalc = () => {
      const counter = countdown()
      
      output.value =  {days: counter[0], hours: counter[1], min: counter[2], sec: counter[3]}
      refresh()
    }

    const refresh = () =>{
      setTimeout(recalc, 1000)
    }
    
    recalc()

    return { goal, countdown, output }
  }
}
</script>

<style scoped>
.output {
  color: var(--accent);
  font-size: 28px;
}
.output.days {
  font-size: 40px;
}
</style>