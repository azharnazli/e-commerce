import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'

const eventBus = new Vue()

export default eventBus

Vue.config.productionTip = false
Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:3000/'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
