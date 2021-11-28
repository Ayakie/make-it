<template>
  <div class="task">
    <p class="created-time">{{ time }}</p>
    <!-- task name and icons -->
    <div class="task-container">
      <div class="task-name">
        <slot name="finished-task-icon"></slot>
        <p>{{ doc.task }}</p>
      </div>
      <div class="icons">
        <slot name="icons">
          <span class="material-icons finish" @click="finishTask">done</span>
          <router-link :to="{name: 'Detail', params: { id: doc.id, tagsSet: tagsSet}}">
            <span class="material-icons">edit</span>
          </router-link>
          <span class="material-icons" @click="deleteTask">delete</span>
        </slot>
      </div>
    </div>
    <!-- memo and tags -->
    <div class="description">
      <div class="memo">
        {{ doc.memo }}
      </div>
      <div class="tags">
        <span class="tag" v-for="tag in doc.tags" :key="tag">
          #{{ tag }}
        </span>
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
        if (props.doc.completed) {
          return format(props.doc.completedAt.toDate(), 'yyyy.MM.dd (E)')
          } else {
          return format(props.doc.createdAt.toDate(), 'yyyy.MM.dd (E) HH:mm')
        }
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
  padding: 8px 20px;
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
.task-name p {
  display: inline-block;
  vertical-align: middle;
  margin: 0 4px;
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
  margin-right: 10px;
}
.material-icons.finish:hover {
  color: var(--finished);
}
.description .memo {
  color: var(--secondary);
  font-size: 14px;
  margin: 4px 8px;
}
.description .tag {
  color: var(--main2);
  font-size: 12px;
  margin-left: 8px;
}
.description {
  margin-top: 4px;
}
</style>