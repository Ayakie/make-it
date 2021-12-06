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

    <!-- calender component -->
    <div class="calendar-container">
      <div class="calendar">
        <Calendar :attributes='attributes' is-expanded
        :rows="$screens({ default: 1, lg: 2 })">
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
      <h3>中間目標</h3>
      <FilterNav @changeStatus="updateStatusGoal" :status="statusGoal"/>
      <!-- ongoing checkpoint -->
      <div v-if="filteredGoals.length && statusGoal==='ongoing'" class="lists-container checkpoints">
        <div v-for="(doc, index) in filteredGoals" :key="doc.id">
          <SingleCheckPoint :doc="doc" :index="index"
          @deleteCheckpoint="handleDelete">
          <template #finish-icon>
            <span class="material-icons finish" @click="handleFinish(doc.id, 'checkpoints')">done</span>
          </template>
          </SingleCheckPoint>
        </div>
      </div>
      <!-- new check point form -->
      <NewCheckPointForm v-if="statusGoal==='ongoing'"/>

      <!-- completed checkpoint -->
      <div v-if="statusGoal==='completed'"  class="lists-container checkpoints">
        <div v-for="(doc, index) in filteredGoals" :key="doc.id">
          <SingleCheckPoint :doc="doc" :index="index" :isCompleted="true"
          @deleteCheckpoint="handleDelete">
            <template #finished-checkpoint-icon>
              <span class="material-icons finished">done</span>
            </template>
            <template #finish-icon>
              <span class="material-icons" @click="handleUnfinish(doc.id)">unpublished</span>
            </template>
          </SingleCheckPoint>
        </div>
        <div v-if="!filteredGoals.length" class="empty-lists">目標に向けた中間目標を設定しよう</div>
      </div>
    </div>
    </div>
  </section>

  <section class="task">
    <h2 class="section-title task">やることリスト</h2>
    <FilterNav @changeStatus="updateStatusTask" :status="statusTask"/>

    <!-- ongoing task page -->
    <div v-if="filteredTasks.length && statusTask==='ongoing'" class="lists-container tasks">
      <div v-for="doc in filteredTasks" :key="doc.id">
        <SingleTask :doc="doc" @deleteTask="handleDelete" :tagsSet="getTagsSet" @finishTask="handleFinish"/>
      </div>
    </div>
    <!-- new task form -->
    <NewTaskForm v-if="statusTask==='ongoing'"/>

    <!-- completed task page -->
    <div class="completed-tasks" v-if="statusTask==='completed'">
      <CompletedTask :tasks="filteredTasks" :tagsSet="getTagsSet"/>
    </div>
  </section>
</template>

<script>
import getCollection from '@/composables/getCollection'
import getUser from '@/composables/getUser'
import HeroBefore from '@/components/goal/HeroBefore.vue'
import HeroAfter from '@/components/goal/HeroAfter.vue'
import NewCheckPointForm from '@/components/goal/NewCheckPointForm.vue'
import SingleCheckPoint from '@/components/goal/SingleCheckPoint.vue'
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
  components: { Navbar, HeroBefore, HeroAfter, NewCheckPointForm, SingleCheckPoint,
  NewTaskForm, SingleTask,
  Calendar, DatePicker, FilterNav, CompletedTask, PopoverRow },
  setup (){
    const user = getUser()
    const tags = ref([])
    const statusTask = ref('ongoing')
    const statusGoal = ref('ongoing')
    const uid = user.value.uid
    // get current user's collection
    const { error: taskError, documents: taskDocs, isPending: taskPending } = getCollection('tasks', ['userId', '==', uid])
    const { error: goalError, documents: goalDocs, isPending: goalPending } = getCollection('goals', ['userId', '==', uid])
    const { error: checkpointError, documents: checkpointDocs, isPending: checkpointPending } = getCollection('checkpoints', ['userId', '==', uid])
    console.log('checkpointDoc', checkpointDocs.value)

    const filteredTasks = computed(() => {
      // return documents based on status（ongoing or completed）
      if (statusTask.value === "ongoing") {
        return taskDocs.value.filter(doc => !doc.completed)
      } else if (statusTask.value === "completed") {
        return taskDocs.value.filter(doc => doc.completed)
      } else {
        throw new Error('another status!')
      }
    })
    const filteredGoals = computed(() => {
      // return documents based on status（ongoing or completed）
      if (statusGoal.value === "ongoing") {
        return checkpointDocs.value.filter(doc => !doc.completed)
      } else if (statusGoal.value === "completed") {
        return checkpointDocs.value.filter(doc => doc.completed)
      } else {
        throw new Error('another status!')
      }
    })

    const handleFinish = async (id, collectionName) => {
      await updateDoc(doc(projectFirestore, collectionName, id), {
        completed: true,
        completedAt: serverTimestamp()
      })
    }

    const handleUnfinish = async (id) => {
      await updateDoc(doc(projectFirestore, 'checkpoints', id), {
        completed: false,
        createdAt: serverTimestamp()
      })
    }

    const handleDelete = async (id, collectionName) => {
      await deleteDoc(doc(projectFirestore, collectionName, id))
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

    const updateStatusTask = (_status) => {
      statusTask.value = _status
    }

    const updateStatusGoal = (_status) => {
      statusGoal.value = _status
    }

    const attributes = computed(() => {
      const attrs = ref([])

      if (!goalPending.value && !taskPending.value && !checkpointPending.value) {
        // today
        attrs.value = [
          {
            key: 'today',
            dates: new Date(),
            highlight: {color: "gray", fillMode: 'solid'},
            popover: {label: 'something'},
            customData: {'label': 'Today'}
          }
        ]
        // goal date
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
        console.log(goalPending.value, taskPending.value, checkpointPending.value)
        attrs.value.push(
        ...taskDocs.value.map(doc => ({
          key: doc.id,
          dates: doc.completed ? doc.completedAt.toDate() : doc.createdAt.toDate(),
          dot: {
            color: doc.completed ? 'green' : 'red',
          },
          customData: {'label': doc.task},
          popover: {'label': doc.task}
          }))
        )
        // checkpoint date
        if (checkpointDocs.value.length) {
          attrs.value.push(
            ...checkpointDocs.value.map(doc => ({
              key: doc.id,
              dates: doc.checkpoint.toDate(),
              highlight: { color:doc.completed ? 'green' : 'red',
                fillMode: 'outline'},
              popover: {'label': doc.goal},
              customData: {'label': doc.goal}
            }))
          )
        }
      }
      return attrs.value
    })

    return {statusGoal, filteredGoals, updateStatusGoal,
    handleFinish, handleUnfinish, handleDelete, handleDeleteGoal,
    goalDocs, getTagsSet, updateStatusTask, statusTask, filteredTasks, attributes}
  }
}
</script>

<style>
section.task {
  margin-top: 56px;
}
.empty-lists {
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
.calendar-container {
  display: flex;
  gap: clamp(45px, 6vw, 80px);
  min-height: 600px;
}
.calendar-container > .calendar {
  flex: 2;
  max-width: 600px;
  display: grid;
  place-items: center;
}
.calendar-container > .checkpoint {
  flex: 1;
  width: 100%;
}
.lists-container.checkpoints {
  max-height: 250px;
  overflow: auto;
}
.section-title.task{
  margin-bottom: 0px;
}
.single-list .material-icons {
    margin-right: 10px;
}
.material-icons.finished {
    color: var(--finished);
}
.material-icons.finished:hover {
    cursor: default;
    color: var(--finished);
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
  .single-list .material-icons {
    margin-right: 8px;
  }
  .single-list .material-icons.delete {
    margin-right: 0px;
  }
}
</style>