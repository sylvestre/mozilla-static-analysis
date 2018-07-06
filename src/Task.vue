<script>
export default {
  name: 'Task',
  components: {
  },
  computed: {
  }
}
</script>

<template>
  <div>
    <h1>Task {{ $route.params.taskId }}</h1>
    <router-link to="/" class="button is-link">Back to tasks</router-link>
  </div>
</template>
