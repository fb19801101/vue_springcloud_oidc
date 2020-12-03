import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/login' // 引入 user module

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 初始化状态
  },
  mutations: {
    // 处理状态
  },
  actions: {
    // 提交改变后的状态
  },
  modules: {
    Login // 使用 login.js 中的 action
  }
})
