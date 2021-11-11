<template>
  <HeroBefore />
  <section class="task">
    <h2>やることリスト</h2>
    <NewTaskForm />
  </section>
</template>

<script>
import HeroBefore from '@/components/hero/HeroBefore.vue'
import NewTaskForm from '@/components/task/NewTaskForm.vue'

export default {
  name: 'Home',
  components: { HeroBefore, NewTaskForm },

}
</script>
