<script>
export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('load_index', 'mozreview')
  },
  data () {
    return {}
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Static analysis demo
      </h1>

      <p v-for="task in tasks">
        {{ task.taskId }}
      </p>
    </div>
  </section>
</template>

<style module>
</style>
