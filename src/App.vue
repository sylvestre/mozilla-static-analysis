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
  <main>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <span>Static analysis demo</span>
        <span class="tag is-warning">{{ channel }}</span>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <router-link to="/" class="button is-link" v-if="$route.name != 'tasks'">All tasks</router-link>
        </div>
      </div>
    </nav>
    <div class="container is-fullhd">
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
.navbar-brand {
  font-size: 1.6em;
  color: white;
  line-height: 1.7em;
  vertical-align: middle;
  padding-left: 5px;
}
.navbar-brand .tag {
  margin-left: 10px;
  margin-top: 12px;
}
</style>
