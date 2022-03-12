import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // AccessToken
  accessToken: JSON.parse(sessionStorage.getItem('accessToken')),

  // 路由名称
  tabPaneTitle: sessionStorage.getItem('TabPaneTitle'),
  // 标签页当前状态
  tabPaneName: sessionStorage.getItem('TabPaneName'),
  // 标签页列表
  tabPaneTags: JSON.parse(sessionStorage.getItem('TabPaneTags')),
  // 标签页序号
  tabPaneIndex: parseInt(sessionStorage.getItem('TabPaneIndex')),

  // 组织人员浏览权限，0无，1浏览，2管理
  browseWeb: parseInt(sessionStorage.getItem('BrowseWeb')),
  // 组织人员浏览权限，0无，1浏览，2管理
  browseApp: parseInt(sessionStorage.getItem('BrowseApp')),
  // 授权管理权限，0无，1浏览，2管理
  systemAuth: parseInt(sessionStorage.getItem('SystemAuth')),
  // 系统日志权限，0无，1浏览，2管理
  systemLog: parseInt(sessionStorage.getItem('SystemLog')),
  // 授权查询权限，0无，1浏览，2管理
  queryAuth: parseInt(sessionStorage.getItem('QueryAuth')),
  // 岗位变化查询，0无，1浏览，2管理
  queryPostChange: parseInt(sessionStorage.getItem('QueryPostChange')),
  // 删除岗位查询，0无，1浏览，2管理
  queryOrgDelete: parseInt(sessionStorage.getItem('QueryOrgDelete')),

  // 网络计算管理权限，0无，1浏览，2管理
  planCompute: parseInt(sessionStorage.getItem('PlanCompute')),
  // 网络计算参数权限，0无，1浏览，2管理
  planParams: parseInt(sessionStorage.getItem('PlanParams')),
  // 静态网路计算权限，0无，1浏览，2管理
  planStatic: parseInt(sessionStorage.getItem('PlanStatic')),
  // 动态网络计算权限，0无，1浏览，2管理
  planEstimate: parseInt(sessionStorage.getItem('PlanEstimate')),
  // 实际网络计算权限，0无，1浏览，2管理
  planActual: parseInt(sessionStorage.getItem('PlanActual')),
  // 树形网络计划权限，0无，1浏览，2管理
  planTree: parseInt(sessionStorage.getItem('PlanTree')),

  // API注册信息
  apiHolder: parseInt(sessionStorage.getItem('ApiHolder'))
}

const mutations = {
  Login (state) {
    state.tabPaneTitle = '首页'
    sessionStorage.setItem('TabPaneTitle', '首页')

    state.tabPaneName = 'home'
    sessionStorage.setItem('TabPaneName', 'home')

    state.tabPaneTags = [{ title: '首页', name: 'home', index: 1 }]
    sessionStorage.setItem('TabPaneTags', JSON.stringify([{ title: '首页', name: 'home', index: 1 }]))

    state.tabPaneIndex = 1
    sessionStorage.setItem('TabPaneIndex', '1')
  },
  initialize () {
    sessionStorage.setItem('accessToken', null)

    sessionStorage.setItem('TabPaneTitle', '首页')
    sessionStorage.setItem('TabPaneName', 'home')
    sessionStorage.setItem('TabPaneTags', JSON.stringify([{ title: '首页', name: 'home', index: 1 }]))
    sessionStorage.setItem('TabPaneIndex', '1')

    sessionStorage.setItem('BrowseWeb', '0')
    sessionStorage.setItem('BrowseApp', '0')
    sessionStorage.setItem('SystemAuth', '0')
    sessionStorage.setItem('SystemLog', '0')
    sessionStorage.setItem('QueryAuth', '0')
    sessionStorage.setItem('QueryPostChange', '0')
    sessionStorage.setItem('QueryOrgDelete', '0')

    sessionStorage.setItem('PlanCompute', '2')
    sessionStorage.setItem('PlanParams', '0')
    sessionStorage.setItem('PlanStatic', '0')
    sessionStorage.setItem('PlanEstimate', '0')
    sessionStorage.setItem('PlanActual', '0')
    sessionStorage.setItem('PlanTree', '0')

    sessionStorage.setItem('ApiHolder', '2')
  },
  updateAccessToken (state, token) {
    state.accessToken = token
    sessionStorage.setItem('accessToken', JSON.stringify(token))
  },
  updateTitle (state, title) {
    state.tabPaneTitle = title
    sessionStorage.setItem('TabPaneTitle', title)
  },
  updateLabelTabName (state, name) {
    state.tabPaneName = name
    sessionStorage.setItem('TabPaneName', name)
  },
  updateLabelTabs (state, tags) {
    state.tabPaneTags = tags
    sessionStorage.setItem('TabPaneTags', JSON.stringify(tags))
  },
  updateLabelTabsIndex (state, index) {
    state.tabPaneIndex = index
    sessionStorage.setItem('TabPaneIndex', index + '')
  },
  updateUserAuth (state, auth) {
    state.browseWeb = auth.browseWeb
    state.browseApp = auth.browseApp
    state.systemAuth = auth.systemAuth
    state.systemLog = auth.systemLog
    state.queryAuth = auth.queryAuth
    state.queryPostChange = auth.queryPostChange
    state.queryOrgDelete = auth.queryOrgDelete

    state.planCompute = auth.planCompute
    state.planParams = auth.planParams
    state.planStatic = auth.planStatic
    state.planEstimate = auth.planEstimate
    state.planActual = auth.planActual
    state.planTree = auth.planTree

    state.apiName = auth.apiName
    state.apiInfo = auth.apiInfo

    sessionStorage.setItem('BrowseWeb', auth.browseWeb + '')
    sessionStorage.setItem('BrowseApp', auth.browseApp + '')
    sessionStorage.setItem('SystemAuth', auth.systemAuth + '')
    sessionStorage.setItem('SystemLog', auth.systemLog + '')
    sessionStorage.setItem('QueryAuth', auth.queryAuth + '')
    sessionStorage.setItem('QueryPostChange', auth.queryPostChange + '')
    sessionStorage.setItem('QueryOrgDelete', auth.queryOrgDelete + '')

    sessionStorage.setItem('PlanCompute', auth.planCompute + '')
    sessionStorage.setItem('PlanParams', auth.planParams + '')
    sessionStorage.setItem('PlanStatic', auth.planStatic + '')
    sessionStorage.setItem('PlanEstimate', auth.planEstimate + '')
    sessionStorage.setItem('PlanActual', auth.planActual + '')
    sessionStorage.setItem('PlanTree', auth.planTree + '')

    sessionStorage.setItem('ApiHolder', auth.apiHolder + '')
  }
}

export default new Vuex.Store({
  state,
  getters: {},
  mutations,
  actions: {},
  modules: {}
})
