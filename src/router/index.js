import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from '../views/Demo.vue'
import Login from '@/views/Login/Login'
import ReLogin from '@/views/Login/ReLogin'

Vue.use(VueRouter)

const HomePage = () => import('@/views/HomePage/HomePage')
const BrowserWeb = () => import('@/views/BrowserPage/BrowserWeb')
const BrowserApp = () => import('@/views/BrowserPage/BrowserApp')
const SystemAuth = () => import('@views/SystemManage/SystemAuth')
const SystemLog = () => import('@/views/SystemManage/SystemLog')
const QueryAuth = () => import('@views/SystemQuery/QueryAuth')
const QueryPostChange = () => import('@/views/SystemQuery/QueryPostChange')
const QueryOrgDelete = () => import('@views/SystemQuery/QueryOrgDelete')
const PlanParams = () => import('@views/PlanCompute/PlanParams')
const PlanStatic = () => import('@views/PlanCompute/PlanStatic')
const PlanEstimate = () => import('@views/PlanCompute/PlanEstimate')
const PlanActual = () => import('@views/PlanCompute/PlanActual')
const PlanTree = () => import('@views/PlanCompute/PlanTree')
const ApiHolder = () => import('@views/ApiHolder/ApiHolder')

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
    children: [
      {
        path: 'home',
        name: 'Home',
        components: { TabPage: HomePage },
        meta: {
          title: '首页'
        }
      },
      {
        path: 'web',
        name: 'BrowserWeb',
        components: { TabPage: BrowserWeb },
        meta: {
          title: '网页端页面'
        }
      },
      {
        path: 'app',
        name: 'BrowserApp',
        components: { TabPage: BrowserApp },
        meta: {
          title: '移动端页面'
        }
      },
      {
        path: 'browser/web',
        name: 'BrowserWeb',
        components: { TabPage: BrowserWeb },
        meta: {
          title: '组织人员浏览'
        }
      },
      {
        path: 'browser/app',
        name: 'BrowserApp',
        components: { TabPage: BrowserApp },
        meta: {
          title: '组织人员浏览'
        }
      },
      {
        path: 'system/auth',
        name: 'SystemAuth',
        components: { TabPage: SystemAuth },
        meta: {
          title: '授权管理'
        }
      },
      {
        path: 'system/log',
        name: 'journal',
        components: { TabPage: SystemLog },
        meta: {
          title: '系统日志'
        }
      },
      {
        path: 'query/auth',
        name: 'QueryAuth',
        components: { TabPage: QueryAuth },
        meta: {
          title: '授权查询'
        }
      },
      {
        path: 'query/post/change',
        name: 'QueryPostChange',
        components: { TabPage: QueryPostChange },
        meta: {
          title: '岗位变化查询'
        }
      },
      {
        path: 'query/org/delete',
        name: 'QueryOrgDelete',
        components: { TabPage: QueryOrgDelete },
        meta: {
          title: '组织删除查询'
        }
      },
      {
        path: 'plan/params',
        name: 'PlanParams',
        components: { TabPage: PlanParams },
        meta: {
          title: '网络计算参数'
        }
      },
      {
        path: 'plan/static',
        name: 'PlanStatic',
        components: { TabPage: PlanStatic },
        meta: {
          title: '静态网络计算'
        }
      },
      {
        path: 'plan/estimate',
        name: 'PlanEstimate',
        components: { TabPage: PlanEstimate },
        meta: {
          title: '动态网络计算'
        }
      },
      {
        path: 'plan/actual',
        name: 'PlanActual',
        components: { TabPage: PlanActual },
        meta: {
          title: '实际网络计算'
        }
      },
      {
        path: 'plan/tree',
        name: 'PlanTree',
        components: { TabPage: PlanTree },
        meta: {
          title: '树形网络计划'
        }
      },
      {
        path: 'api/holder',
        name: 'ApiHolder',
        components: { TabPage: ApiHolder },
        meta: {
          title: 'API注册信息'
        }
      }
    ],
    meta: {
      title: '首页'
    }
  }
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Home
  // },
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
