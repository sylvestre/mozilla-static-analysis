<script>
import Tasks from './Tasks.vue'

export default {
  name: 'App',
  components: {
    Tasks
  },
  data () {
    return {
      channels: ['testing', 'staging', 'production']
    }
  },
  methods: {
    switch_channel (channel) {
      this.$store.dispatch('switch_channel', channel)
    }
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
      <div class="container is-fluid">
        <div class="navbar-brand">
          <div class="navbar-item">Static analysis</div>
        </div>
        <div class="navbar-menu">

          <div class="navbar-start">
            <div class="navbar-item has-dropdown is-hoverable">
              <span class="navbar-link">{{ channel }}</span>
              <div class="navbar-dropdown is-boxed">
                <a class="dropdown-item" v-for="c in channels" :class="{'is-active': c == channel}" v-on:click="switch_channel(c)">
                  {{ c }}
                </a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
              <router-link to="/" class="button is-link" v-if="$route.name != 'tasks'">All tasks</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="container is-fluid">
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
.navbar-brand .navbar-item {
  font-size: 1.1em;
  font-weight: bold;
  color: #a3cc69 !important;
}

div.navbar-item.has-dropdown {
  text-transform: capitalize;
}
</style>
