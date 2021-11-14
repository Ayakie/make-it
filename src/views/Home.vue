<template>
  <Navbar />
  <HeroBefore />
  <section class="task">
    <h2>やることリスト</h2>
    <div v-if="documents.length" class="tasks">
      <div v-for="doc in documents" :key="doc.id">
        <SingleTask :doc="doc" @delete="handleDelete"/>
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
import NewTaskForm from '@/components/task/NewTaskForm.vue'
import SingleTask from '@/components/task/SingleTask.vue'
import { projectFirestore } from "@/firebase/config"
import { doc, deleteDoc } from 'firebase/firestore'

export default {
  name: 'Home',
  components: { HeroBefore, NewTaskForm, SingleTask, Navbar },
  setup (){
    const user = getUser()
    // get current user's collection
    const { error, documents } = getCollection('tasks', ['userId', '==', user.value.uid])

    const handleDelete = async (id) => {
      await deleteDoc(doc(projectFirestore, 'tasks', id))
    }

    return { error, documents, handleDelete}
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 24px;
}
.tasks {
  max-width: 600px;
  background: white;
  border-radius: 4px;
  margin: 40px auto;
  padding: 32px;
}
</style>