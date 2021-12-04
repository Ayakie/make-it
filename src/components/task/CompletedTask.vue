<template>
    <div class="completed-tasks-container">
        <div class="tasks-container">
            <div class="tasks">
                <div v-for="doc in tasks" :key="doc.id">
                    <SingleTask :doc="doc" @delete="handleDelete" :tagsSet="tagsSet.value" :isCompleted="true">
                        <template #finished-task-icon>
                            <span class="material-icons finish">done</span>
                        </template>
                        <template #icons>
                            <router-link :to="{name: 'Detail', params: { id: doc.id, tagsSet: tagsSet.value, isCompleted: true}}">
                                <span class="material-icons">edit</span>
                            </router-link>
                        </template>
                    </SingleTask>
                </div>
                <div class="no-task" v-if="!tasks.length">達成したことを振り返ることでモチベーションアップ！</div>
            </div>
        </div>
        <div class="tags">
            <h4 class="tags-title">タグ一覧</h4>
            <div class="tag show-all"
            :class="{selected: isSelected === '全て表示'}"
            @click="handleClick('全て表示')">全て表示</div><br>
            <div v-for="tag in tagsSet.value" :key="tag" class="tag"
            :class="{selected: isSelected === tag}"
            @click="handleClick(tag)"># {{ tag }}</div>
        </div>
    </div>
</template>

<script>
import SingleTask from '@/components/task/SingleTask.vue'
import { projectFirestore } from "@/firebase/config"
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, computed } from '@vue/reactivity'

export default {
    name: 'CompletedTask',
    props:['tasks','tagsSet', 'uid'],
    components: { SingleTask },
    inheritAttrs: false,

    setup(props) {
        const tasks = ref(props.tasks)
        console.log(tasks.value)
        const isSelected = ref('全て表示')
        const handleDelete = async (id) => {
            await deleteDoc(doc(projectFirestore, 'tasks', id))
        }
        const handleClick = (tag) => {
            isSelected.value = tag
            if (tag === "全て表示") {
                tasks.value = props.tasks
            } else {
                tasks.value = props.tasks.filter(task => task.tags.includes(tag))
            }
        }
        return { handleDelete, tasks, handleClick, isSelected}
    }

}
</script>

<style scoped>
.completed-tasks-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 24px;

}
.tasks-container {
    width: 95%;
    margin: 0 auto;
}
.tasks {
    max-height: 600px;
    overflow: auto;
}
.tag {
  display: inline-block;
  margin: 4px 8px;
  /* padding: 8px 16px; */
  color: var(--secondary);
  cursor: pointer;
}
.tags-title {
    text-align: center;
    color: var(--main);
    margin-bottom: 8px;
}
.selected {
    color: var(--accent);
    font-weight: bold;
    border-bottom: none;
}
.material-icons.finish {
    color: var(--finished);
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
    .material-icons.finish {
    font-size: 20px;
  }
}
</style>