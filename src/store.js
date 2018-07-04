import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const TASKCLUSTER_INDEX = 'https://index.taskcluster.net/v1/'

export default new Vuex.Store({
  state: {
    channel: 'testing',
    tasks: []
  },
  mutations: {
    use_tasks (state, tasks) {
      // Filter tasks without extra data
      state.tasks = state.tasks.concat(
        tasks.filter(task => task.data.indexed !== undefined)
      )

      // Sort by indexation date
      state.tasks.sort((x, y) => {
        return new Date(y.data.indexed) - new Date(x.data.indexed)
      })
    }
  },
  actions: {
    // Load indexed tasks summary from Taskcluster
    load_index (state, namespace) {
      let url = TASKCLUSTER_INDEX + '/tasks/project.releng.services.project.' + this.state.channel + '.shipit_static_analysis.' + namespace
      axios.get(url).then(resp => {
        state.commit('use_tasks', resp.data.tasks)
      })
    }
  }
})
