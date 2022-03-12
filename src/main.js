import Vue from 'vue'
import './plugins/axios'
import './plugins/element.js'
import './icons/index.js'
import App from './App.vue'
import router from './router'
import store from './store'
import global from '@/utils/global'
import http from 'vue-resource'

Vue.use(http)
Vue.config.productionTip = false
Vue.prototype.global = global

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
