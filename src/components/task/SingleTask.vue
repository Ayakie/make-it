<template>
  <div class="task">
      <p>{{ doc.createdAt }}</p>
      <h4>{{ doc.userName }}</h4>
      <p>{{ doc.task }}</p>
  </div>
</template>

<script>
export default {
    props: ['doc'],
    setup(props, context) {
        
    }
}
</script>

<style>

</style>