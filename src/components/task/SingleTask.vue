<template>
  <div class="single-list">
    <p class="created-time">{{ time }}</p>
    <!-- task name and icons -->
    <div class="single-list-container">
      <div class="task-name" :class="{completed: isCompleted === true}">
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
    props: ['doc', 'tagsSet', 'isCompleted'],
    setup(props, context) {
      const time = computed(() => {
        if (props.doc.completed) {
          return format(props.doc.completedAt.toDate(), 'yyyy.MM.dd (E)')
          } else {
          return format(props.doc.createdAt.toDate(), 'yyyy.MM.dd (E) HH:mm')
        }
      })

      const finishTask = () => {
        context.emit('finishTask', props.doc.id, 'tasks')
      }

      const deleteTask = () => {
        context.emit('deleteTask', props.doc.id, 'tasks')
      }

      return { time, deleteTask, finishTask }
    }
}
</script>

<style scoped>
.task-name {
  max-width: 390px;
  display: flex;
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
.single-list .material-icons {
  margin-right: 10px;
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
@media (max-width: 768px) {
  .tasks {
    padding: 12px 24px;
  }
  .task {
    padding: 0px;
    font-size: 15px;
  }
  .task-name {
    max-width: 170px;
  }
  .task-name.completed {
    max-width: 220px;
  }
}
</style>