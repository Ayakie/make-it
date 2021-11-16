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
import HeroAfter from '@/components/hero/HeroAfter.vue'
import NewTaskForm from '@/components/task/NewTaskForm.vue'
import SingleTask from '@/components/task/SingleTask.vue'
import { projectFirestore } from "@/firebase/config"
import { doc, deleteDoc } from 'firebase/firestore'

export default {
  name: 'Home',
  components: { HeroBefore, HeroAfter, NewTaskForm, SingleTask, Navbar },
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

<style>
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
/* smartphone */
@media (max-width: 768px) {
    .hero-img {
        left: 20px;
        filter: opacity(70%);
    }
}
</style>