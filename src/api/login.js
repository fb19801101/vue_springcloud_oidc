import axios from '@/utils/baseAxios'

export default {
  // 获取AccessToken
  accessToken: function () {
    return axios.axiosGet('/api/access_token')
  },
  userInfo: function () {
    return axios.axiosGet('/api/user_info')
  },
  redirectLogin: function () {
    return axios.axiosGet('/api/redirect_login')
  },
  redirectLogout: function () {
    return axios.axiosGet('/api/redirect_logout')
  },
  // 获取登录用户
  currentUserInfo: function (providerId, userId) {
    return axios.axiosGet('/dev-api/current_user_info', {
      providerId: providerId,
      userId: userId
    })
  },
  currentUserAuth: function (providerId, userId) {
    return axios.axiosGet('/dev-api/current_user_auth', {
      providerId: providerId,
      userId: userId
    })
  },
  currentAuthRootNode: function (providerId, userId) {
    return axios.axiosGet('/dev-api/current_auth_root_node', {
      providerId: providerId,
      userId: userId
    })
  },
  currentCRCCNodeAndAdmin: function () {
    return axios.axiosGet('/dev-api/current_crcc_node_admin')
  },
  InitOrganizationAndUsers: function (optProvider, optId, providerId, orgId, orgType) {
    return axios.axiosGet('/dev-api/init_organization_and_users', {
      optProvider: optProvider,
      optId: optId,
      providerId: providerId,
      orgId: orgId,
      orgType: orgType
    })
  },
  initTreeLevelAndSort: function () {
    return axios.axiosGet('/dev-api/init_tree_level_and_sort')
  },
  // 获取组织结构
  getOrganizationChildren: function (providerId, orgId, orgType) {
    return axios.axiosGet('/dev-api/get_organization_children', {
      providerId: providerId,
      orgId: orgId,
      orgType: orgType
    })
  },
  getOrganizationChildrenFilter: function (providerId, orgId, orgType, filterType) {
    return axios.axiosGet('/dev-api/get_organization_children_filter', {
      providerId: providerId,
      orgId: orgId,
      orgType: orgType,
      filterType: filterType
    })
  },
  getOrganizationPath: function (providerId, orgId, level, virtual) {
    return axios.axiosGet('/dev-api/get_organization_path', {
      providerId: providerId,
      orgId: orgId,
      level: level,
      virtual: virtual
    })
  },
  // 获取用户列表
  getPositionUsers: function (providerId, positionId) {
    return axios.axiosGet('/dev-api/get_position_users', {
      providerId: providerId,
      positionId: positionId
    })
  },
  getSearchUsers: function (providerId, orgId, orgType, filter) {
    return axios.axiosGet('/dev-api/get_search_users', {
      providerId: providerId,
      orgId: orgId,
      orgType: orgType,
      filter: filter
    })
  },
  getUserList: function (optProvider, optId, providerId, orgId) {
    return axios.axiosGet('/dev-api/get_user_list', {
      optProvider: optProvider,
      optId: optId,
      providerId: providerId,
      orgId: orgId
    })
  },
  getUsersCount: function () {
    return axios.axiosGet('/dev-api/get_users_count')
  },
  getUsersWithOffsetAndLimit: function (offset, limit) {
    return axios.axiosGet('/dev-api/get_users_with_offset_and_limit', {
      offset: offset,
      limit: limit
    })
  },
  // 获取实时用户列表
  getUsersInfo: function (params) {
    return axios.axiosPost('/dev-api/get_users_info', {
      params: params
    })
  },
  // 获取权限列表
  queryAuthByNode: function (nodeProvider, nodeId) {
    return axios.axiosGet('/dev-api/query_auth_by_node', {
      nodeProvider: nodeProvider,
      nodeId: nodeId
    })
  },
  queryAuthByCode: function (nodeProvider, nodeCode) {
    return axios.axiosGet('/dev-api/query_auth_by_code', {
      nodeProvider: nodeProvider,
      nodeCode: nodeCode
    })
  },
  // 登录人员鉴权岗位变化和组织结构删除
  authLogin: function (optProvider, optId, _await) {
    return axios.axiosGet('/dev-api/auth_login', {
      optProvider: optProvider,
      optId: optId,
      await: _await
    })
  },
  // 登录人员鉴权岗位变化
  authPostChange: function (optProvider, optId, _await) {
    return axios.axiosGet('/dev-api/auth_post_change', {
      optProvider: optProvider,
      optId: optId,
      await: _await
    })
  },
  // 登录人员鉴权组织删除
  authOrgDelete: function (optProvider, optId, _await) {
    return axios.axiosGet('/dev-api/auth_org_delete', {
      optProvider: optProvider,
      optId: optId,
      await: _await
    })
  },
  // 登录人员鉴权组织删除
  authOrgUpdate: function (optProvider, optId, _await) {
    return axios.axiosGet('/dev-api/auth_org_update', {
      optProvider: optProvider,
      optId: optId,
      await: _await
    })
  },
  // 增加多个权限
  addAuthList: function (params) {
    return axios.axiosPost('/dev-api/add_auth_list', {
      params: params
    })
  },
  // 删除对象权限
  deleteAuth: function (providerId, operatorId, objProvider, objId) {
    return axios.axiosGet('/dev-api/delete_auth', {
      providerId: providerId,
      operatorId: operatorId,
      objProvider: objProvider,
      objId: objId
    })
  },
  // 删除多个权限
  deleteAuthList: function (params) {
    return axios.axiosPost('/dev-api/delete_auth_list', {
      params: params
    })
  },
  // 查询某个对象的菜单权限
  queryAuth: function (objProvider, objId) {
    return axios.axiosGet('/dev-api/query_auth', {
      objProvider: objProvider,
      objId: objId
    })
  },
  // 修改某个对象权限
  updateAuth: function (optProvider, optId, objProvider, objId, authOrg, authOpAuth, authQueryAuth, authLog, authPostChange, authPostDelete) {
    return axios.axiosGet('/dev-api/update_auth', {
      optProvider: optProvider,
      optId: optId,
      objProvider: objProvider,
      objId: objId,
      authOrg: authOrg,
      authOpAuth: authOpAuth,
      authQueryAuth: authQueryAuth,
      authLog: authLog,
      authPostChange: authPostChange,
      authPostDelete: authPostDelete
    })
  },
  // 岗位变化日志列表
  getAllPostLog: function () {
    return axios.axiosGet('/dev-api/get_all_post_log')
  },
  // 获取岗位变化日志列表
  queryPostByNodeId: function (nodeProvider, nodeId) {
    return axios.axiosGet('/dev-api/query_post_by_node_id', {
      nodeProvider: nodeProvider,
      nodeId: nodeId
    })
  },
  queryPostByNodeCode: function (nodeProvider, nodeCode) {
    return axios.axiosGet('/dev-api/query_post_by_node_code', {
      nodeProvider: nodeProvider,
      nodeCode: nodeCode
    })
  },
  // 组织删除日志列表
  getAllOrgLog: function () {
    return axios.axiosGet('/dev-api/get_all_org_log')
  },
  // 获取组织删除日志列表
  queryOrgByNodeId: function (nodeProvider, nodeId) {
    return axios.axiosGet('/dev-api/query_org_by_node_id', {
      nodeProvider: nodeProvider,
      nodeId: nodeId
    })
  },
  queryOrgByNodeCode: function (nodeProvider, nodeCode) {
    return axios.axiosGet('/dev-api/query_org_by_node_code', {
      nodeProvider: nodeProvider,
      nodeCode: nodeCode
    })
  },
  // 查询系统日志列表
  getAllLog: function () {
    return axios.axiosGet('/dev-api/get_all_log')
  },
  // 获取系统日志列表
  queryLogByNodeId: function (nodeProvider, nodeId) {
    return axios.axiosGet('/dev-api/query_log_by_node_id', {
      nodeProvider: nodeProvider,
      nodeId: nodeId
    })
  },
  queryLogByNodeCode: function (nodeProvider, nodeCode) {
    return axios.axiosGet('/dev-api/query_log_by_node_code', {
      nodeProvider: nodeProvider,
      nodeCode: nodeCode
    })
  },
  // 查询菜单权限
  queryMenuAuth: function (providerId, userId, objProvider, objId) {
    return axios.axiosGet('/dev-api/query_menu_auth', {
      providerId: providerId,
      userId: userId,
      objProvider: objProvider,
      objId: objId
    })
  },

  // 网络计划参数初始化
  planParams: function (params) {
    return axios.axiosPost('/dev-api/plan_params', {
      params: params
    })
  },
  // 静态网络计划计算
  planStatic: function () {
    return axios.axiosGet('/dev-api/plan_static')
  },
  // 动态网络计划计算
  planEstimate: function (params, actual) {
    return axios.axiosPost('/dev-api/plan_estimate', {
      params: params,
      actual: actual
    })
  },
  // 实际网络计划计算
  planActual: function (params, actual) {
    return axios.axiosPost('/dev-api/plan_actual', {
      params: params,
      actual: actual
    })
  },
  // 导出网络计划列表
  planExport: function (path) {
    return axios.axiosGet('/dev-api/plan_export', {
      path: path
    })
  },
  // 获取网络计划列表结构
  planList: function () {
    return axios.axiosGet('/dev-api/plan_list')
  },
  // 获取网络计划树结构
  planTree: function () {
    return axios.axiosGet('/dev-api/plan_tree')
  },
  // api注册信息
  apiInfo: function (apiName) {
    return axios.axiosGet('/dev-api/api_info', {
      apiName: apiName
    })
  },
  // api全部注册信息
  apiList: function () {
    return axios.axiosGet('/dev-api/api_list')
  },
  // 应用API注册
  apiCheck: function (apiName) {
    return axios.axiosGet('/dev-api/api_check', {
      apiName: apiName
    })
  },
  // 应用API登录
  apiLogin: function (apiName) {
    return axios.axiosGet('/dev-api/api_login', {
      apiName: apiName
    })
  },
  // 应用API调用
  apiCall: function (apiName) {
    return axios.axiosGet('/dev-api/api_call', {
      apiName: apiName
    })
  },
  // 应用回调地址过滤
  uriFilter: function (filter) {
    return axios.axiosGet('/dev-api/uri_filter', {
      filter: filter
    })
  }
}
