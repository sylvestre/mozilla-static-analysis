<script>
export default {
  mounted () {
    this.$store.dispatch('calc_stats')
  },
  data () {
    return {
      sort: 'detected'
    }
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
      let sortStr = (x, y) => x.toLowerCase().localeCompare(y.toLowerCase())
      var sorts = {
        'analyzer': (x, y) => sortStr(x.analyzer, y.analyzer) || sortStr(x.check, y.check),
        'check': (x, y) => sortStr(x.check, y.check),
        'detected': (x, y) => y.total - x.total,
        'published': (x, y) => y.publishable - x.publishable
      }

      // Apply local sort to the checks from store
      var checks = Object.values(this.stats.checks)
      checks.sort(sorts[this.sort])
      return checks
    }
  },
  methods: {
    select_sort (name) {
      this.$set(this, 'sort', name)
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
            <th>
              <span class="button" v-on:click="select_sort('analyzer')" :class="{'is-focused': sort == 'analyzer' }">Analyzer</span>
            </th>
            <th>
              <span class="button" v-on:click="select_sort('check')" :class="{'is-focused': sort == 'check' }">Check</span>
            </th>
            <th>
              <span class="button" v-on:click="select_sort('detected')" :class="{'is-focused': sort == 'detected' }">Detected</span>
            </th>
            <th>
              <span class="button" v-on:click="select_sort('published')" :class="{'is-focused': sort == 'published' }">Published</span>
            </th>
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
