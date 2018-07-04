<script>
export default {
  name: 'App',
  mounted () {
    this.$store.dispatch('load_index', 'mozreview')
    this.$store.dispatch('load_index', 'phabricator')
  },
  data () {
    return {}
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  },
  filters: {
    // Display time since elapsed in a human format
    since (datetime) {
      var dspStep = (t, name) => (Math.round(t) + ' ' + name + (t > 1 ? 's' : ''))

      let diff = (new Date() - new Date(datetime)) / 1000
      let steps = [
        [60, 'second'],
        [60, 'minute'],
        [24, 'hour'],
        [30, 'month']
      ]
      var prev = ''
      for (let [t, name] of steps) {
        if (diff > t) {
          prev = dspStep(diff % t, name)
          diff = diff / t
        } else {
          return dspStep(diff, name) + ' ' + prev
        }
      }
      return 'plop'
    }
  }
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <td>#</td>
        <td>Revision</td>
        <td>Indexed</td>
        <td>Actions</td>
      </tr>
    </thead>

    <tbody>
      <tr v-for="task in tasks">
        <td>
          <a class="mono" :href="'https://tools.taskcluster.net/task-inspector/#' + task.taskId" target="_blank">{{ task.taskId }}</a>
        </td>

        <td v-if="task.data.source == 'mozreview'">

          <span class="tag is-success">MozReview</span> #{{ task.data.review_request }}

          <br />
          <small class="mono has-dark-text">{{ task.data.rev}}</small>
        </td>
        <td v-else-if="task.data.source == 'phabricator'">

          <span class="tag is-dark">Phabricator</span> #{{ task.data.id }}

          <br />
          <small class="mono has-dark-text">{{ task.data.diff_phid}}</small>
        </td>
        <td v-else>
          <p class="notification is-danger">Unknown data source: {{ task.data.source }}</p>
        </td>

        <td>
          <span :title="task.data.indexed">{{ task.data.indexed|since }} ago</span>
        </td>
        <td>
          <a class="button is-link" :href="task.data.url" target="_blank">Review</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
a.mono{
  font-family: monospace;
}
</style>
