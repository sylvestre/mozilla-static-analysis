<script>
export default {
  mounted () {
    this.$store.dispatch('calc_stats')
  },
  computed: {
    stats () {
      return this.$store.state.stats
    },
    progress () {
      if (!this.stats || !this.stats.ids) {
        return null
      }
      return 100 * this.stats.loaded / this.stats.ids.length
    },
    checks () {
      if (!this.stats || !this.stats.loaded) {
        return null
      }

      // Apply local sort to the checks from store
      var checks = Object.values(this.stats.checks)
      checks.sort((x, y) => y.total - x.total)
      return checks
    }
  }
}
</script>

<template>
  <div>
    <h1 class="title">Statistics</h1>
    <h2 class="subtitle" v-if="stats && stats.ids">Loaded {{ stats.loaded }}/{{ stats.ids.length }} tasks</h2>

    <div v-if="stats">
      <progress class="progress is-info" :class="{'is-info': progress < 100, 'is-success': progress >= 100}" :value="progress" max="100">{{ progress }}%</progress>

      <table class="table is-fullwidth" v-if="checks">
        <thead>
          <tr>
            <th>Analyzer</th>
            <th>Check</th>
            <th>Detected</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="check in checks" :class="{'publishable': check.publishable > 0}">
            <td>{{ check.analyzer }}</td>
            <td>{{ check.check }}</td>
            <td>{{ check.total }}</td>
            <td>{{ check.publishable }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="notification is-info" v-else>Loading tasks...</div>

  </div>
</template>

<style scoped>
tr.publishable {
  background: #e6ffcc;
}
</style>
