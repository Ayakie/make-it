<template>
    <h4 class="tags-title"># タグ一覧</h4>
    <div class="tag show-all"
    :class="{selected: selectedTag === '全て表示'}"
    @click="handleClick('全て表示')">全て表示</div>
    <div v-for="tag in tagsSet.value" :key="tag" class="tag"
    :class="{selected: selectedTag === tag}"
    @click="handleClick(tag)"># {{ tag }}</div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    props: ['tagsSet'],
    emits: ['selectTag'],
    setup(props, context) {

        const selectedTag = ref('全て表示')
        const handleClick = (tag) => {
            selectedTag.value = tag
            context.emit('selectTag', tag)
        }
        return{ handleClick, selectedTag }
    }
}
</script>

<style>
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
</style>