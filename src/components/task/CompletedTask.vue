<template>
    <div class="completed-tasks-container">
        <div class="tasks">
            <div v-for="doc in tasks" :key="doc.id">
                <SingleTask :doc="doc" @delete="handleDelete" :tagsSet="getTagsSet">

                </SingleTask>
            </div>
            <div class="no-task" v-if="!tasks">達成したことを振り返ることでモチベーションアップ！</div>
        </div>
        <div class="tags">
            <p>タグ一覧</p>
            <div v-for="tag in tagsSet" :key="tag" class="tag"># {{ tag }}</div>
        </div>
    </div>
</template>

<script>
import SingleTask from '@/components/task/SingleTask.vue'
import { projectFirestore } from "@/firebase/config"
import { doc, deleteDoc } from 'firebase/firestore'
import { ref } from '@vue/reactivity'

export default {
    name: 'CompletedTask',
    props:['tasks','tagsSet'],
    components: { SingleTask },
    inheritAttrs: false,

    setup(props) {
        const tasks = ref(props.tasks.value)
        const tagsSet = props.tagsSet.value
        console.log(tagsSet)
        const handleDelete = async (id) => {
            await deleteDoc(doc(projectFirestore, 'tasks', id))
        }
        return { handleDelete, tagsSet, tasks }
    }

}
</script>

<style scoped>
.completed-tasks-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 24px;
}
.tasks {
    width: 90%;
}
.tag {
  display: inline-block;
  margin: 4px 8px;
  /* padding: 8px 16px; */
  color: var(--secondary);
  cursor: pointer;
}
.tags p {
    margin: 24px auto;
}
@media (max-width: 768px) {
    .completed-tasks-container {
        display: block;
    }
    .tags {
        margin: 0 24px;
    }
    .tags p {
        margin: 8px auto;
        text-align: center;
    }
}
</style>