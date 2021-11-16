<template>
  <div class="modal">
      <h3>目標と達成予定日を設定しよう</h3>
      <p>登録することで、達成日までのカウントダウンが表示されます</p>
      <form @submit.prevent="handleSubmit">
          <label for="goal">目標</label>
          <input type="text" id="goal" required placeholder="例) 〇〇大学に合格する">
          <label for="goal-date">達成日</label>
          <input type="date" id="goal-date" required>
          <button>登録する</button>
      </form>
      <BackPage />
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import BackPage from '@/components/BackPage.vue'

export default {
    components: { BackPage },
    setup() {
        const router = useRouter()

        const handleSubmit = () => {

        }

        return { handleSubmit }
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
</style>