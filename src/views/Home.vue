<template>
  <Navbar />
  <HeroAfter v-if="goalDocs.length"
  :date="goalDocs[0]['date']"
  :goal="goalDocs[0]['goal']"
  :id="goalDocs[0]['id']"
  @deleteGoal="handleDeleteGoal"
  />
  <HeroBefore v-else/>

  <section class="calendar">
    <h2>目標日を確認しよう</h2>
    <div class="calendar-container">
      <div class="calendar">
        <Calendar is-expanded :attributes='attributes'>
          <template #day-popover="{ dayTitle, attributes }">
            {{ dayTitle }}
            <br>
            <popover-row v-for="attr in attributes" :key="attr.key" :attribute="attr">
              {{ attr.customData.label }}
            </popover-row>
          </template>
        </Calendar>
      </div>
    <div class="checkpoint">
      <h3>チェックポイント</h3>
      <NewCheckPointForm />
    </div>
    </div>
  </section>

  <section class="task">
    <h2 class="section-title task">やることリスト</h2>
    <FilterNav @changeStatus="updateStatus" :status="status"/>

    <!-- ongoing task page -->
    <div v-if="filteredDocs.length && status==='ongoing'" class="tasks">
      <div v-for="doc in filteredDocs" :key="doc.id">
        <SingleTask :doc="doc" @delete="handleDeleteTask" :tagsSet="getTagsSet" @finish="handleFinish"/>
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
import HeroBefore from '@/components/goal/HeroBefore.vue'
import HeroAfter from '@/components/goal/HeroAfter.vue'
import NewCheckPointForm from '@/components/goal/NewCheckPointForm.vue'
import NewTaskForm from '@/components/task/NewTaskForm.vue'
import SingleTask from '@/components/task/SingleTask.vue'
import FilterNav from '@/components/FilterNav.vue'
import CompletedTask from '@/components/task/CompletedTask.vue'
import { projectFirestore } from "@/firebase/config"
import { doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { Calendar, DatePicker, PopoverRow } from 'v-calendar'
import { ref, computed } from '@vue/reactivity'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: { Navbar, HeroBefore, HeroAfter, NewTaskForm, SingleTask,
  Calendar, DatePicker, FilterNav, CompletedTask, PopoverRow, NewCheckPointForm },
  setup (){
    const user = getUser()
    const tags = ref([])
    const status = ref('ongoing')
    const uid = user.value.uid
    // get current user's collection
    const { error: taskError, documents: taskDocs, isPending: taskPending } = getCollection('tasks', ['userId', '==', uid])
    const { error: goalError, documents: goalDocs, isPending: goalPending } = getCollection('goals', ['userId', '==', uid])
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

    const handleDeleteTask = async (id) => {
      await deleteDoc(doc(projectFirestore, 'tasks', id))
    }

    const handleDeleteGoal = async () => {
      console.log('deleted!!')
      const id = goalDocs.value[0]['id']
      await deleteDoc((doc(projectFirestore, 'goals', id)))
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

    const attributes = computed(() => {
      const attrs = ref([])
      if (!goalPending.value && !taskPending.value) {
        attrs.value = [
          {
            key: 'today',
            dates: new Date(),
            highlight: {color: "gray", fillMode: 'solid'},
            popover: {label: 'something'},
            customData: {'label': 'Today'}
          }
        ]
        if (goalDocs.value.length) {
          attrs.value.push(
            {
              key: 'goal date',
              dates: goalDocs.value[0]['date'].toDate(),
              highlight: { color: 'orange', fillMode: 'solid' },
              popover: {label: 'something'},
              customData: {'label': goalDocs.value[0]['goal']}
            }
          )
        }
        console.log(goalPending.value, taskPending.value)
        attrs.value.push(
        ...taskDocs.value.map(doc => ({
          key: doc.id,
          dates: doc.completed ? doc.completedAt.toDate() : doc.createdAt.toDate(),
          dot: {
            color: doc.completed ? 'green' : 'red',
          },
          customData: {'label': doc.task},
          popover: {
            visibility: 'click'
            }
          }))
        )
        console.log('attributes in computed', attrs.value)
      }
      return attrs.value
    })

    return { taskDocs, handleFinish, handleDeleteTask, handleDeleteGoal,
    goalDocs, getTagsSet, updateStatus, status, filteredDocs, attributes}
  }
}
</script>

<style>
section.task {
  margin-top: 56px;
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
  filter: opacity(80%);
  z-index: -1;
}
.hero .title {
  margin-bottom: 24px;
}
.material-icons.edit {
  position: absolute;
  top: 57%;
  right: 25vw;
}
.material-icons.delete {
  position: absolute;
  top: 57%;
  right: 21vw;
}
.calendar-container {
  display: flex;
  gap: clamp(45px, 6vw, 80px);
  align-items: center;
}
.calendar-container > .calendar {
  flex: 2;
  max-width: 600px;
}
.calendar-container > .checkpoint {
  flex: 1;
}
.section-title.task{
  margin-bottom: 0px;
}
/* smartphone */
@media (max-width: 768px) {
  .hero {
    height: 320px;
  }
  .hero-img {
    left: 20px;
    filter: opacity(50%);
    top: 1%;
  }
  .hero .title {
    margin-top: 20px;
    margin-bottom: 0;
  }
  .calendar-container {
    flex-direction: column;
  }
  .material-icons.edit {
    position: absolute;
    top: 65%;
    right: 15vw;
    }
  .material-icons.delete {
  position: absolute;
  top: 65%;
  right: 7vw;
    }
}
</style>