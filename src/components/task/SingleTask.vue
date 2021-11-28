<template>
  <div class="task">
    <p class="created-time">{{ time }}</p>
    <div class="task-container">
      <p>{{ doc.task }}</p>
      <div class="icons">
        <span class="material-icons finish" @click="finishTask">done</span>
        <router-link :to="{name: 'Detail', params: { id: doc.id, tagsSet: tagsSet}}">
          <span class="material-icons">edit</span>
        </router-link>
        <span class="material-icons" @click="deleteTask">delete</span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { format } from 'date-fns'

export default {
    props: ['doc', 'tagsSet'],
    setup(props, context) {
      
      const time = computed(() => {
        return format(props.doc.createdAt.toDate(), 'yyyy.MM.dd (E) HH:mm')
      })

      const finishTask = () => {
        context.emit('finish', props.doc.id)
      }

      const deleteTask = () => {
        context.emit('delete', props.doc.id)
      }

      return { time, deleteTask, finishTask }
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
  width: 80%;
}
.created-time {
    font-size: 14px;
    color: var(--secondary);
    margin-bottom: 8px;
  }
.material-icons {
  margin-right: 8px;
}
.material-icons.finish:hover {
  color: var(--finished);
}
</style>