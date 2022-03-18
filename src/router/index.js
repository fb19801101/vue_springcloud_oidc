import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from '../views/Demo.vue'
import Login from '@/views/Login/Login'
import ReLogin from '@/views/Login/ReLogin'

Vue.use(VueRouter)

const LayoutChild = () => import('@/components/LayoutTabs/LayoutChild')
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
        name: 'HomePage',
        components: { TabPaneView: HomePage },
        meta: {
          title: '首页',
          cache: false,
          affix: false,
          auth: true,
          icon: 'el-icon-discount'
        }
      },
      {
        path: 'browser',
        name: 'Browser',
        components: { TabPaneView: LayoutChild },
        meta: {
          title: '组织人员浏览',
          cache: false,
          affix: false,
          auth: true,
          icon: 'el-icon-user-solid'
        },
        children: [
          {
            path: 'web',
            name: 'BrowserWeb',
            components: { TabPaneChild: BrowserWeb },
            meta: {
              title: '网页端页面',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          },
          {
            path: 'app',
            name: 'BrowserApp',
            components: { TabPaneChild: BrowserApp },
            meta: {
              title: '移动端页面',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          }
        ]
      },
      {
        path: 'system',
        name: 'System',
        components: { TabPaneView: LayoutChild },
        meta: {
          title: '授权管理',
          cache: false,
          affix: false,
          auth: true,
          icon: 'el-icon-setting'
        },
        children: [
          {
            path: 'auth',
            name: 'SystemAuth',
            components: { TabPaneChild: SystemAuth },
            meta: {
              title: '授权管理',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          },
          {
            path: 'log',
            name: 'SystemLog',
            components: { TabPaneChild: SystemLog },
            meta: {
              title: '系统日志',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          }
        ]
      },
      {
        path: 'query',
        name: 'Query',
        components: { TabPaneView: LayoutChild },
        meta: {
          title: '授权查询',
          cache: false,
          affix: false,
          auth: true,
          icon: 'el-icon-menu'
        },
        children: [
          {
            path: 'auth',
            name: 'QueryAuth',
            components: { TabPaneChild: QueryAuth },
            meta: {
              title: '授权查询',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          },
          {
            path: 'post/change',
            name: 'QueryPostChange',
            components: { TabPaneChild: QueryPostChange },
            meta: {
              title: '岗位变化查询',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          },
          {
            path: 'org/delete',
            name: 'QueryOrgDelete',
            components: { TabPaneChild: QueryOrgDelete },
            meta: {
              title: '组织删除查询',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          }
        ]
      },
      {
        path: 'plan',
        name: 'Plan',
        components: { TabPaneView: LayoutChild },
        meta: {
          title: '网络计算参数',
          cache: false,
          affix: false,
          auth: true,
          icon: 'el-icon-date'
        },
        children: [
          {
            path: 'params',
            name: 'PlanParams',
            components: { TabPaneChild: PlanParams },
            meta: {
              title: '网络计算参数',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          },
          {
            path: 'static',
            name: 'PlanStatic',
            components: { TabPaneChild: PlanStatic },
            meta: {
              title: '静态网络计算',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          },
          {
            path: 'estimate',
            name: 'PlanEstimate',
            components: { TabPaneChild: PlanEstimate },
            meta: {
              title: '动态网络计算',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          },
          {
            path: 'actual',
            name: 'PlanActual',
            components: { TabPaneChild: PlanActual },
            meta: {
              title: '实际网络计算',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          },
          {
            path: 'tree',
            name: 'PlanTree',
            components: { TabPaneChild: PlanTree },
            meta: {
              title: '树形网络计划',
              cache: false,
              affix: false,
              auth: true,
              icon: 'el-icon-document'
            }
          }
        ]
      },
      {
        path: 'api/holder',
        name: 'ApiHolder',
        components: { TabPaneView: ApiHolder },
        meta: {
          title: 'API注册信息',
          cache: false,
          affix: false,
          auth: true,
          icon: 'el-icon-help'
        }
      }
    ],
    meta: {
      title: '主页',
      cache: false,
      affix: false,
      auth: true,
      icon: null
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
