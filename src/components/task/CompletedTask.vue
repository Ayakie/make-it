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
.material-icons.finished {
    color: var(--finished);
}
.material-icons.finished:hover {
    cursor: default;
}
@media (max-width: 768px) {
    .lists-container {
        margin: 20px auto;
    }
    /* .tags {
        margin: 24px 24px 0 24px;
    }
    .tags-title {
        margin-bottom: 0;
    }
    .tags p {
        margin: 8px auto;
        text-align: center;
    } */
    .material-icons.finish {
    font-size: 20px;
  }
}
</style>