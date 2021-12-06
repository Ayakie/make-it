<template>
    <div class="completed-tasks-container">
        <div class="tags">
            <h4 class="tags-title"># タグ一覧</h4>
            <div class="tag show-all"
            :class="{selected: isSelected === '全て表示'}"
            @click="handleClick('全て表示')">全て表示</div>
            <div v-for="tag in tagsSet.value" :key="tag" class="tag"
            :class="{selected: isSelected === tag}"
            @click="handleClick(tag)"># {{ tag }}</div>
        </div>
        <div class="tasks-container">
            <div class="lists-container tasks">
                <div v-for="doc in tasks" :key="doc.id">
                    <SingleTask :doc="doc" @delete="handleDelete" :tagsSet="tagsSet.value" :isCompleted="true">
                        <template #finished-task-icon>
                            <span class="material-icons finished">done</span>
                        </template>
                        <template #icons>
                            <router-link :to="{name: 'Detail', params: { id: doc.id, tagsSet: tagsSet.value, isCompleted: true}}">
                                <span class="material-icons">edit</span>
                            </router-link>
                        </template>
                    </SingleTask>
                </div>
                <div class="empty-lists" v-if="!tasks.length">達成したことを振り返ることでモチベーションアップ！</div>
            </div>
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
    display: flex;
    flex-direction: row-reverse;
    gap: 24px;
}
.tasks-container {
    flex: 2;
}
.tags {
    flex: 1;
    text-align: center;
}
.lists-container {
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
.material-icons.finished {
    color: var(--finished);
}
.material-icons.finished:hover {
    cursor: default;
}
.checkpoint {
    align-items: center;
}
@media (max-width: 768px) {
    .completed-tasks-container {
        display: flex;
        flex-direction: column;
        gap: 0;
    }
    .tags {
        margin: 24px 24px 0 24px;
    }
    .tags-title {
        margin-bottom: 0;
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