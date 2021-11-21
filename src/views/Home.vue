<template>
  <Navbar />
  <HeroAfter v-if="goalDocs.length"
  :date="goalDocs[0]['date']"
  :goal="goalDocs[0]['goal']"
  />
  <HeroBefore v-if="!goalDocs.length"/>
  <section class="calendar">
    <div class="calendar-container">
      <Calendar is-expanded :attributes='attrs' />
    </div>
  </section>
  <section class="task">
    <h2>やることリスト</h2>
    <div v-if="taskDocs.length" class="tasks">
      <div v-for="doc in taskDocs" :key="doc.id">
        <SingleTask :doc="doc" @delete="handleDelete" :tags="getTagsSet"/>
      </div>
    </div>
    <NewTaskForm />
  </section>
</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import Navbar from '@/components/Navbar.vue'
import HeroBefore from '@/components/hero/HeroBefore.vue'
import HeroAfter from '@/components/hero/HeroAfter.vue'
import NewTaskForm from '@/components/task/NewTaskForm.vue'
import SingleTask from '@/components/task/SingleTask.vue'
import { projectFirestore } from "@/firebase/config"
import { doc, deleteDoc } from 'firebase/firestore'
import { Calendar, DatePicker } from 'v-calendar'
import { ref } from '@vue/reactivity'
import { onMounted, onUpdated, computed } from '@vue/runtime-core'

export default {
  name: 'Home',
  components: { HeroBefore, HeroAfter, NewTaskForm, SingleTask, Navbar, Calendar, DatePicker },
  setup (){
    const user = getUser()
    const tags = ref([])
    // get current user's collection
    const { error: taskError, documents: taskDocs } = getCollection('tasks', ['userId', '==', user.value.uid])
    const { error: goalError, documents: goalDocs } = getCollection('goals', ['userId', '==', user.value.uid])

    const handleDelete = async (id) => {
      await deleteDoc(doc(projectFirestore, 'tasks', id))
    }

    const getTagsSet = computed(() => {
      const tagsSet = new Set()
      taskDocs.value.forEach(doc => {
        doc.tags.forEach(tag => tagsSet.add(tag))
      })

      tags.value = [...tagsSet]
      console.log('tagsSet:', tags.value)

      return tags
    })


    return { taskDocs, handleDelete, goalDocs, getTagsSet }
  },
  data() {
    return {
      attrs: [
        {
          key: 'today',
          highlight: {
            color: 'gray',
            fillMode: 'solid'
            },
          dates: new Date(),
        },
      ],
    };
  }
}
</script>

<style>
section.task {
  margin-top: 48px;
}
.tasks {
  max-width: 600px;
  background: white;
  border-radius: 4px;
  margin: 40px auto;
  padding: 32px;
}
.hero {
    height: 480px;
    position: relative;
}
.hero-container {
    display: grid;
    justify-items: center;
    align-content: center;
    height: 100%;
}
.hero-img {
  position: absolute;
  left: max(15vw, 120px);
  top: 10%;
  z-index: -1;
}
.hero .title {
  margin-bottom: 24px;
}
.material-icons.edit {
  position: absolute;
  top: 50%;
  right: 25vw;

}
.calendar-container {
  max-width: 600px;
  margin: 0 auto;
}
/* smartphone */
@media (max-width: 768px) {
    .hero-img {
        left: 20px;
        filter: opacity(70%);
    }
}
</style>