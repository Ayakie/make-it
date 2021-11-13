<template>
  <HeroBefore />
  <section class="task">
    <h2>やることリスト</h2>
    <div class="tasks">
      <div v-if="documents">
        <div v-for="doc in documents" :key="doc.id">
          <SingleTask :doc="doc"/>
        </div>
      </div>
    </div>
    <NewTaskForm />
  </section>
</template>

<script>
import getCollection from '@/composables/getCollection'
import HeroBefore from '@/components/hero/HeroBefore.vue'
import NewTaskForm from '@/components/task/NewTaskForm.vue'
import SingleTask from '@/components/task/SingleTask.vue'

export default {
  name: 'Home',
  components: { HeroBefore, NewTaskForm, SingleTask },
  setup (){
    const { error, documents } = getCollection('tasks')

    return { error, documents }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>