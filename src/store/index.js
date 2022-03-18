import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // AccessToken
  accessToken: JSON.parse(sessionStorage.getItem('AccessToken')),

  // LayoutDevice
  layoutDevice: sessionStorage.getItem('LayoutDevice'),

  // 标签页标题
  tabPaneTitle: sessionStorage.getItem('TabPaneTitle'),
  // 标签页名称
  tabPaneName: sessionStorage.getItem('TabPaneName'),
  // 标签页索引
  tabPaneIndex: parseInt(sessionStorage.getItem('TabPaneIndex')),
  // 标签页列表
  tabPaneTags: JSON.parse(sessionStorage.getItem('TabPaneTags')),

  // 用户权限
  userAuth: {
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

    // API注册信息权限，0无，1浏览，2管理
    apiHolder: parseInt(sessionStorage.getItem('ApiHolder'))
  },

  // API注册名称
  apiName: '',
  // API注册信息
  apiInfo: {},

  // 显示的页面
  visitedViews: [],
  // 缓存页面
  cachedViews: [],

  // 路由列表
  routedViews: []
}

const mutations = {
  INITIALIZE_LOGIN_STATE: state => {
    state.layoutDevice = 'browse'

    state.tabPaneTitle = '首页'
    state.tabPaneName = 'HomePage'
    state.tabPaneIndex = 1
    state.tabPaneTags = [{ title: '首页', name: 'HomePage', index: 1 }]

    sessionStorage.setItem('LayoutDevice', 'browse')

    sessionStorage.setItem('TabPaneTitle', '首页')
    sessionStorage.setItem('TabPaneName', 'HomePage')
    sessionStorage.setItem('TabPaneIndex', '1')
    sessionStorage.setItem('TabPaneTags', JSON.stringify([{ title: '首页', name: 'HomePage', index: 1 }]))
  },
  INITIALIZE_SESSION_STORAGE: state => {
    state.accessToken = null

    state.layoutDevice = 'browse'

    state.tabPaneTitle = '首页'
    state.tabPaneName = 'HomePage'
    state.tabPaneIndex = 1
    state.tabPaneTags = [{ title: '首页', name: 'HomePage', index: 1 }]

    state.userAuth = {
      browseWeb: 0,
      browseApp: 0,

      systemAuth: 0,
      systemLog: 0,

      queryAuth: 0,
      queryPostChange: 0,
      queryOrgDelete: 0,

      planParams: 1,
      planStatic: 1,
      planEstimate: 1,
      planActual: 1,
      planTree: 1,

      apiHolder: 1
    }

    state.apiName = ''
    state.apiInfo = {}

    sessionStorage.setItem('AccessToken', null)

    sessionStorage.setItem('LayoutDevice', 'browse')

    sessionStorage.setItem('TabPaneTitle', '首页')
    sessionStorage.setItem('TabPaneName', 'HomePage')
    sessionStorage.setItem('TabPaneIndex', '1')
    sessionStorage.setItem('TabPaneTags', JSON.stringify([{ title: '首页', name: 'HomePage', index: 1 }]))

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

  ADD_TAB_PANE_TAG: (state, tag) => {
    if (state.tabPaneTags.includes(tag)) return
    if (tag.name != null && tag.name !== 'HomePage') {
      tag.index = state.tabPaneTags.length + 1
      state.tabPaneTags.push(tag)
      sessionStorage.setItem('TabPaneTags', JSON.stringify(state.tabPaneTags))
    }
  },
  DEL_TAB_PANE_TAG: (state, tag) => {
    for (const i of state.tabPaneTags) {
      if (i.name === tag.name && i.name !== 'HomePage') {
        const index = state.tabPaneTags.indexOf(i)
        state.tabPaneTags.splice(index, 1)
        break
      }
    }
    state.tabPaneTags.forEach((i, index) => {
      i.index = index + 1
    })
    sessionStorage.setItem('TabPaneTags', JSON.stringify(state.tabPaneTags))
  },
  DEL_ALL_PANE_TAGS: state => {
    state.tabPaneTags = [{ title: '首页', name: 'HomePage', index: 1 }]
    sessionStorage.setItem('TabPaneTags', JSON.stringify(state.tabPaneTags))
  },

  UPDATE_ACCESS_TOKEN: (state, token) => {
    state.accessToken = token
    sessionStorage.setItem('AccessToken', JSON.stringify(token))
  },

  UPDATE_LAYOUT_DEVICE: (state, device) => {
    state.layoutDevice = device
    sessionStorage.setItem('LayoutDevice', device)
  },

  UPDATE_TAB_PANE_TITLE: (state, title) => {
    state.tabPaneTitle = title
    sessionStorage.setItem('TabPaneTitle', title)
  },
  UPDATE_TAB_PANE_NAME: (state, name) => {
    state.tabPaneName = name
    sessionStorage.setItem('TabPaneName', name)
  },
  UPDATE_TAB_PANE_INDEX: (state, index) => {
    state.tabPaneIndex = index
    sessionStorage.setItem('TabPaneIndex', index + '')
  },
  UPDATE_TAB_PANE_TAGS: (state, tags) => {
    state.tabPaneTags = tags
    sessionStorage.setItem('TabPaneTags', JSON.stringify(tags))
  },

  UPDATE_USER_AUTH: (state, auth) => {
    state.userAuth = auth

    sessionStorage.setItem('BrowseWeb', auth.browseWeb + '')
    sessionStorage.setItem('BrowseApp', auth.browseApp + '')

    sessionStorage.setItem('SystemAuth', auth.systemAuth + '')
    sessionStorage.setItem('SystemLog', auth.systemLog + '')

    sessionStorage.setItem('QueryAuth', auth.queryAuth + '')
    sessionStorage.setItem('QueryPostChange', auth.queryPostChange + '')
    sessionStorage.setItem('QueryOrgDelete', auth.queryOrgDelete + '')

    sessionStorage.setItem('PlanParams', auth.planParams + '')
    sessionStorage.setItem('PlanStatic', auth.planStatic + '')
    sessionStorage.setItem('PlanEstimate', auth.planEstimate + '')
    sessionStorage.setItem('PlanActual', auth.planActual + '')
    sessionStorage.setItem('PlanTree', auth.planTree + '')

    sessionStorage.setItem('ApiHolder', auth.apiHolder + '')
  },
  UPDATE_API_INFO: (state, apiInfo) => {
    state.apiInfo = apiInfo
    state.apiName = apiInfo.name
  },

  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.cache) {
      state.cachedViews.push(view.name)
    }
  },
  ADD_ROUTED_VIEW: (state, view) => {
    if (state.routedViews.includes(view)) return
    if (!view.meta.cache) {
      state.routedViews.push(view)
    }
  },

  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  DEL_ROUTED_VIEW: (state, view) => {
    for (const i of state.routedViews) {
      if (i === view) {
        const index = state.routedViews.indexOf(i)
        state.routedViews.splice(index, 1)
        break
      }
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, index + 1)
        break
      }
    }
  },
  DEL_OTHERS_ROUTED_VIEWS: (state, view) => {
    for (const i of state.routedViews) {
      if (i === view) {
        const index = state.routedViews.indexOf(i)
        state.routedViews = state.routedViews.slice(index, index + 1)
        break
      }
    }
  },

  DEL_ALL_VISITED_VIEWS: state => {
    state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix)
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  },
  DEL_ALL_ROUTED_VIEWS: state => {
    state.routedViews = []
  },

  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  UPDATE_CACHED_VIEW: (state, view) => {
    for (let v of state.cachedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  UPDATE_ROUTED_VIEW: (state, view) => {
    for (let v of state.routedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}

const actions = {
  initializeLoginState ({ commit }) {
    commit('INITIALIZE_LOGIN_STATE')
  },
  initializeSessionStorage ({ commit }) {
    commit('INITIALIZE_SESSION_STORAGE')
  },

  addTabPaneTag ({ commit, state }, tag) {
    return new Promise(resolve => {
      commit('ADD_TAB_PANE_TAG', tag)
      resolve([...state.tabPaneTags])
    })
  },
  delTabPaneTag ({ commit, state }, tag) {
    return new Promise(resolve => {
      commit('DEL_TAB_PANE_TAG', tag)
      resolve([...state.tabPaneTags])
    })
  },
  delAllTabPaneTags ({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_PANE_TAGS')
      resolve([...state.tabPaneTags])
    })
  },

  updateAccessToken ({ commit, state }, token) {
    commit('UPDATE_ACCESS_TOKEN', token)
    return new Promise(resolve => {
      resolve(state.accessToken)
    })
  },

  updateLayoutDevice ({ commit, state }, device) {
    return new Promise(resolve => {
      commit('UPDATE_LAYOUT_DEVICE', device)
      resolve(state.layoutDevice)
    })
  },

  updateTabPaneTitle ({ commit, state }, title) {
    return new Promise(resolve => {
      commit('UPDATE_TAB_PANE_TITLE', title)
      resolve(state.tabPaneTitle)
    })
  },
  updateTabPaneName ({ commit, state }, name) {
    return new Promise(resolve => {
      commit('UPDATE_TAB_PANE_NAME', name)
      resolve(state.tabPaneName)
    })
  },
  updateTabPaneIndex ({ commit, state }, index) {
    return new Promise(resolve => {
      commit('UPDATE_TAB_PANE_INDEX', index)
      resolve(state.tabPaneIndex)
    })
  },
  updateTabPaneTags ({ commit, state }, tags) {
    return new Promise(resolve => {
      commit('UPDATE_TAB_PANE_TAGS', tags)
      resolve([...state.tabPaneTags])
    })
  },

  updateUserAuth ({ commit, state }, auth) {
    return new Promise(resolve => {
      commit('UPDATE_USER_AUTH', auth)
      resolve(state.userAuth)
    })
  },
  updateApiInfo ({ commit, state }, apiInfo) {
    return new Promise(resolve => {
      commit('UPDATE_API_INFO', apiInfo)
      resolve(state.apiInfo)
    })
  },

  addView ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('addVisitedView', view)
      dispatch('addCachedView', view)
      dispatch('addRoutedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
        routedViews: [...state.routedViews]
      })
    })
  },
  addVisitedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('ADD_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  addCachedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('ADD_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  addRoutedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('ADD_ROUTED_VIEW', view)
      resolve([...state.routedViews])
    })
  },

  delView ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      dispatch('delRoutedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
        routedViews: [...state.routedViews]
      })
    })
  },
  delVisitedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  delRoutedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_ROUTED_VIEW', view)
      resolve([...state.routedViews])
    })
  },

  delOthersViews ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      dispatch('delOthersRoutedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
        routedViews: [...state.routedViews]
      })
    })
  },
  delOthersVisitedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },
  delOthersRoutedViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_ROUTED_VIEWS', view)
      resolve([...state.routedViews])
    })
  },

  delAllViews ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      dispatch('delAllRoutedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
        routedViews: [...state.routedViews]
      })
    })
  },
  delAllVisitedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },
  delAllRoutedViews ({ commit, state }) {
    return new Promise(resolve => {
      commit('DEL_ALL_ROUTED_VIEWS')
      resolve([...state.routedViews])
    })
  },

  updateView ({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('updateVisitedView', view)
      dispatch('updateCachedView', view)
      dispatch('updateRoutedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
        routedViews: [...state.routedViews]
      })
    })
  },
  updateVisitedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('UPDATE_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  updateCachedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('UPDATE_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  updateRoutedView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('UPDATE_ROUTED_VIEW', view)
      resolve([...state.routedViews])
    })
  }
}

const getters = {
  // AccessToken
  accessToken: state => state.accessToken,

  // LayoutDevice
  layoutDevice: state => state.layoutDevice,

  // 路由名称
  tabPaneTitle: state => state.tabPaneTitle,
  // 标签页当前状态
  tabPaneName: state => state.tabPaneName,
  // 标签页列表
  tabPaneTags: state => state.tabPaneTags,
  // 标签页序号
  tabPaneIndex: state => state.tabPaneIndex,

  // 用户权限
  userAuth: state => state.userAuth,

  // API信息
  apiName: state => state.apiName,
  apiInfo: state => state.apiInfo,

  // 显示的页面
  visitedViews: state => state.visitedViews,
  // 缓存页面
  cachedViews: state => state.cachedViews,

  // 路由列表
  routedViews: state => state.routedViews
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {}
})
