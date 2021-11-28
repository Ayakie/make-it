<template>
  <div class="filter-nav">
      <div class="part1"
      :class="{selected: status === 'ongoing'}"
       @click="handleClick('ongoing')">これから</div>
      <div class="part2"
      :class="{selected: status === 'completed'}"
      @click="handleClick('completed')">これまでの軌跡</div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
    props: ['status'],
    setup(props, context) {
        const status = ref(props.status)
        const handleClick = (_status) => {
            context.emit('changeStatus', _status)
            status.value = _status
        }

        return { handleClick, status }
    }
}
</script>

<style>
.filter-nav {
    margin-left:24px;
}
.part1, .part2 {
    color: var(--secondary);
    display: inline-block;
    padding: 8px 8px;
    cursor: pointer;
}
.part:hover {
    opacity: 80%;
}
.selected {
    border-bottom: 2px solid var(--main2);
    color: var(--main2);
}

@media (max-width: 768px) {
    .filter-nav {
        display: flex;
        justify-content: center;
        margin: 0 auto;
    }
}
</style>