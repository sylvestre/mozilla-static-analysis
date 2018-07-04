import Vue from 'vue'
import 'bulma/css/bulma.css'
import App from './App.vue'
import store from './store.js'

export default new Vue({
  el: '#root',
  store: store,
  render: (h) => h(App)
})
