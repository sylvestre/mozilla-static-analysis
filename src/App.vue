<script>
import Tasks from './Tasks.vue'

export default {
  name: 'App',
  components: {
    Tasks
  },
  computed: {
    channel () {
      return this.$store.state.channel
    }
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Static analysis demo <span class="tag is-warning">{{ channel }}</span>
      </h1>

      <router-view></router-view>
    </div>
  </section>
</template>
