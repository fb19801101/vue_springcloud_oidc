import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login'
import ReLogin from '@/views/Login/ReLogin'
import NavRouter from './modules/nav'
import PressesRouter from './modules/presses'
import ToastRouter from './modules/toast'
import TodoRouter from './modules/todo'

Vue.use(VueRouter)

const Demo = () => import('@/views/Demo')

const routes = [
  {
    path: '/',
    name: 'Login',
    components: { default: Login },
    meta: {
      title: '登录'
    }
  },
  {
    path: '/re-login',
    name: 'ReLogin',
    component: ReLogin
  },
  {
    path: '/demo',
    name: 'demo',
    components: { default: Demo },
    meta: {
      title: '主页',
      cache: false,
      affix: false,
      auth: true
    },
    children: [
      ...NavRouter,
      ...PressesRouter,
      ...TodoRouter,
      ...ToastRouter
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  base: '/',
  mode: 'hash', // 默认为hash url包含/#/ 哈希路由
  // mode: 'history',  //url不包含/#/ 指的绝对路由 历史路由
  scrollBehavior: () => ({ y: 0 }),
  routes
})

// 解决相同路径跳转报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (sessionStorage.getItem('token') === 'success' && to.path === '/login') {
    router.push('dome/browser/web')
  }
  next()
})

export default router
