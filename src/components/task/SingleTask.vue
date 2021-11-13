<template>
  <div class="task">
    <div class="task-container">
      <div class="text">
        <p class="created-time">{{ doc.createdAt }}</p>
        <p class="detail">{{ doc.task }}</p>
      </div>
      <!-- icons -->
      <div class="action">
        <span class="material-icons">delete</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['doc'],
    setup(props, context) {
        
    }
}
</script>

<style scoped>
.task {
  margin: 24px auto;
  padding: 8px 16px;
  background: white;
  border-bottom: 0.5px solid #d7d7d7;
  max-width: 600px;
}
.task-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.detail {
  margin-top: 8px;
  cursor: pointer;
}

</style>