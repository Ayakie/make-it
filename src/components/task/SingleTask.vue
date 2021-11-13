<template>
  <div class="task">
    <p class="created-time">{{ time }}</p>
    <div class="task-container">
      <p class="detail">{{ doc.task }}</p>
      <!-- icons -->
      <span class="material-icons">delete</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { format } from 'date-fns'

export default {
    props: ['doc'],
    setup(props, context) {
      const time = computed(() => {
        return format(props.doc.createdAt.toDate(), 'yyyy.MM.dd (E) H:m')
      })

      return { time }
    }
}
</script>

<style scoped>
.task {
  margin: 24px auto;
  padding: 8px 16px;
  background: white;
  border-bottom: 0.5px solid #d7d7d7;
  max-width: 600px;
}
.task-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.detail {
  cursor: pointer;
}

</style>