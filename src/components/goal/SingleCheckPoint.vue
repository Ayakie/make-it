<template>
  <div class="single-list">
      <div class="single-list-container">
          <div class="title checkpoint"  :class="{completed: isCompleted===true}">
              <slot name="finished-checkpoint-icon">{{ index+1 }}.</slot>
            <span class="date">{{ goalDate }}</span>までに
            <span class="goal">{{ doc.goal }}</span>
          </div>
        <div class="icons">
            <slot name="finish-icon"></slot>
            <!-- <span class="material-icons finish" @click="finishCheckpoint">done</span> -->
            <span class="material-icons delete" @click="deleteCheckpoint">delete</span>
        </div>
      </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export default {
    props:['doc', 'index', 'isCompleted'],
    setup(props, context) {
        const goalDate = format(props.doc.checkpoint.toDate(), 'yyyy年M月d日(E) ', {locale: ja})

        const finishCheckpoint = () => {
            context.emit('finishCheckpoint', props.doc.id, 'checkpoints')
        }

        const deleteCheckpoint = () => {
            context.emit('deleteCheckpoint', props.doc.id, 'checkpoints')
        }

        return { goalDate, finishCheckpoint, deleteCheckpoint }
    }
}
</script>

<style scoped>
.date {
    font-weight: bold;
}
.single-list .title.checkpoint {
    max-width:370px;
}

.material-icons.finished {
    color: var(--finished);
}
.material-icons.finished:hover {
    cursor: default;
}
@media (max-width: 768px) {
    .single-list .title.checkpoint {
        max-width: 200px;
    }
}
</style>