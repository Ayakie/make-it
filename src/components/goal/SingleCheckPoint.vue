<template>
  <div class="single-list">
      <div class="single-list-container">
          <div>
              {{ index+1 }}.
            <span class="date">{{ goalDate }}</span>までに
            <span class="goal">{{ doc.goal }}</span>
          </div>
        <div class="icons">
            <span class="material-icons finish" @click="finishCheckpoint">done</span>
            <span class="material-icons" @click="deleteCheckpoint">delete</span>
        </div>
      </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

export default {
    props:['doc', 'index'],
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

<style>
.date {
    font-weight: bold;
}
</style>