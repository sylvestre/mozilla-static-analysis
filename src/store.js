import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const TASKCLUSTER_INDEX = 'https://index.taskcluster.net/v1'
const TASKCLUSTER_QUEUE = 'https://queue.taskcluster.net/v1'

export default new Vuex.Store({
  state: {
    channel: 'testing',
    tasks: [],
    report: null
  },
  mutations: {
    reset_tasks (state, tasks) {
      state.tasks = []
    },
    use_tasks (state, tasks) {
      // Filter tasks without extra data
      state.tasks = state.tasks.concat(
        tasks.filter(task => task.data.indexed !== undefined)
      )

      // Sort by indexation date
      state.tasks.sort((x, y) => {
        return new Date(y.data.indexed) - new Date(x.data.indexed)
      })
    },
    use_report (state, report) {
      state.report = report
    }
  },
  actions: {
    load_all_indexes (state) {
      state.commit('reset_tasks')
      state.dispatch('load_index', 'mozreview')
      state.dispatch('load_index', 'phabricator')
    },

    // Load indexed tasks summary from Taskcluster
    load_index (state, namespace) {
      let url = TASKCLUSTER_INDEX + '/tasks/project.releng.services.project.' + this.state.channel + '.shipit_static_analysis.' + namespace
      axios.get(url).then(resp => {
        state.commit('use_tasks', resp.data.tasks)
      })
    },

    // Load the report for a given task
    load_report (state, taskId) {
      let url = TASKCLUSTER_QUEUE + '/task/' + taskId + '/artifacts/public/results/report.json'
      state.commit('use_report', null)
      return axios.get(url).then(resp => {
        state.commit('use_report', resp.data)
      })
    }
  }
})
