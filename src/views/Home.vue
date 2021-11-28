<template>
  <HeroAfter v-if="goalDocs.length"
  :date="goalDocs[0]['date']"
  :goal="goalDocs[0]['goal']"
  :id="goalDocs[0]['id']"
  />
  <HeroBefore v-if="!goalDocs.length"/>

  <section class="calendar">
    <div class="calendar-container">
      <Calendar is-expanded :attributes='attributes'>
        <template #day-popover>
          {{ goalDocs[0]['goal'] }}
        </template>
      </Calendar>
    </div>
  </section>

  <section class="task">
    <h2>やることリスト</h2>
    <FilterNav @changeStatus="updateStatus" :status="status"/>

    <!-- ongoing task page -->
    <div v-if="filteredDocs.length && status==='ongoing'" class="tasks">
      <div v-for="doc in filteredDocs" :key="doc.id">
        <SingleTask :doc="doc" @delete="handleDelete" :tagsSet="getTagsSet" @finish="handleFinish"/>
      </div>
    </div>
    <!-- new task form -->
    <NewTaskForm v-if="status==='ongoing'"/>

    <!-- completed task page -->
    <div class="completed-tasks" v-if="status==='completed'">
      <CompletedTask :tasks="filteredDocs" :tagsSet="getTagsSet" :uid="uid"/>
    </div>
  </section>
</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import HeroBefore from '@/components/hero/HeroBefore.vue'
import HeroAfter from '@/components/hero/HeroAfter.vue'
import NewTaskForm from '@/components/task/NewTaskForm.vue'
import SingleTask from '@/components/task/SingleTask.vue'
import FilterNav from '@/components/FilterNav.vue'
import CompletedTask from '@/components/task/CompletedTask.vue'
import { projectFirestore } from "@/firebase/config"
import { doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { Calendar, DatePicker, Popover } from 'v-calendar'
import { ref, computed } from '@vue/reactivity'
import { onMounted, onUpdated, watch, watchEffect } from '@vue/runtime-core'

export default {
  name: 'Home',
  components: { HeroBefore, HeroAfter, NewTaskForm, SingleTask, Calendar, DatePicker, FilterNav, CompletedTask },
  setup (){
    const user = getUser()
    const tags = ref([])
    const status = ref('ongoing')
    const uid = user.value.uid
    // get current user's collection
    const { error: taskError, documents: taskDocs } = getCollection('tasks', ['userId', '==', uid])
    const { error: goalError, documents: goalDocs } = getCollection('goals', ['userId', '==', uid])
    console.log('goalDoc', goalDocs.value)

    const filteredDocs = computed(() => {
      // return documents based on status（ongoing or completed）
      if (status.value === "ongoing") {
        return taskDocs.value.filter(doc => !doc.completed)
      } else if (status.value === "completed") {
        return taskDocs.value.filter(doc => doc.completed)
      } else {
        throw new Error('another status!')
      }
    })

    const handleFinish = async (id) => {
      await updateDoc(doc(projectFirestore, 'tasks', id), {
        completed: true,
        completedAt: serverTimestamp()
      })
    }

    const handleDelete = async (id) => {
      await deleteDoc(doc(projectFirestore, 'tasks', id))
    }

    const getTagsSet = computed(() => {
      const tagsSet = new Set()
      taskDocs.value.forEach(doc => {
        doc.tags.forEach(tag => tagsSet.add(tag))
      })
      tags.value = [...tagsSet]

      return tags
    })

    const updateStatus = (_status) => {
      status.value = _status
    }
    const attributes = ref([
      {
        dates: new Date(),
        highlight: {color: "gray", fillMode: 'solid'},
        // popover: {label: '今日'}
      }
    ])
    watchEffect(() => {
      console.log('changed', goalDocs.value[0])
      if (goalDocs.value[0]) {
        attributes.value.push({
          dates: goalDocs.value[0]['date'].toDate(),
          highlight: { color: 'orange', fillMode: 'solid' },
          popover: {label: 'something'}
          }
        )
        console.log(attributes.value)
      }
    })

    return { taskDocs, handleFinish, handleDelete, goalDocs, getTagsSet, updateStatus, status, filteredDocs, attributes}
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
  margin: 24px auto;
  padding: 32px;
}
.no-task {
  color: var(--secondary);
  text-align: center;
}
.hero {
    height: 400px;
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
      filter: opacity(60%);
    }
    .hero .title {
      margin-top: 20px;
      margin-bottom: 0;
    }
  .material-icons.edit {
    position: absolute;
    top: 65%;
    right: 5vw;
}
}
</style>