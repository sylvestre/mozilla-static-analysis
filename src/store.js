import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

const TASKCLUSTER_INDEX = 'https://index.taskcluster.net/v1/'

export default new Vuex.Store({
  state: {
    channel: 'testing',
    tasks: null
  },
  mutations: {
    use_tasks (state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    load_index (state, namespace) {
      // Build Url to fetch tasks descriptions
      let url = TASKCLUSTER_INDEX + '/tasks/project.releng.services.project.' + this.state.channel + '.shipit_static_analysis.' + namespace
      console.debug('Loading index', url)
      axios.get(url).then(resp => {
        state.commit('use_tasks', resp.data.tasks)
      })
    }
  }
})
