import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // 配置学生信息页面路由
  { path: '/student', name: 'Student', component: () => import('../views/Student') },
  // 配置坐标计算页面路由
  { path: '/measure', name: 'Measure', component: () => import('../views/Measure') },
  // 配置登录页面路由
  { path: '/login', name: 'Login', component: () => import('../views/login/login') },
  // 配置登录成功页面路由，使用时需要使用 path 路径来实现跳转
  { path: '/success', name: 'Success', component: () => import('../views/login/success') },
  // 配置登录失败页面路由，使用时需要使用 path 路径来实现跳转
  { path: '/error', name: 'Error', component: () => import('../views/login/error'), hidden: true },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  base: '/dist',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

export default router
