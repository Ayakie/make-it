<template>
    <SingleTask :doc="doc" :tagsSet="tagsSet.value" :isCompleted="true">
        <template #finished-task-icon>
            <span class="material-icons finished">done</span>
        </template>
        <template #icons>
            <router-link :to="{name: 'Detail', params: { id: doc.id, tagsSet: tagsSet.value, isCompleted: true}}">
                <span class="material-icons">edit</span>
            </router-link>
        </template>
    </SingleTask>
</template>

<script>
import SingleTask from '@/components/task/SingleTask.vue'

export default {
    name: 'CompletedTask',
    props:['doc', 'tagsSet'],
    components: { SingleTask }
}
</script>

<style>
.completed-tasks-container {
    display: flex;
    flex-direction: row-reverse;
    gap: 24px;
}
.lists-container.tasks {
    flex: 2;
    margin: 24px 0;
}
.lists-container {
    /* 左寄せ */
    margin: 24px 0;
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
    .lists-container {
        margin: 20px auto;
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