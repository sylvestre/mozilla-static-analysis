import Vue from 'vue'
import VueRouter from 'vue-router'
import Tasks from './Tasks.vue'
import Task from './Task.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: Tasks
    },
    {
      path: '/task/:taskId',
      name: 'task',
      component: Task
    }
  ]
})
