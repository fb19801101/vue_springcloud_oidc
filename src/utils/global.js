// SessionStorage Login Info Init

export default {
  providerId: null,
  userId: null,
  userAuth: '',
  userType: '',
  userInfo: {},
  crccNodeProvider: '',
  crccNodeId: 0,
  crccNodeName: '',
  crccNodeCode: '',
  crccNodeType: 0,
  crccAdminProvider: '',
  crccAdminId: 0,
  crccAdminName: '',

  objProvider: '',
  objId: 0,
  objType: 0,
  objPostId: 0,

  nodeProvider: '',
  nodeId: 0,
  nodeCode: '',
  nodeType: 0,

  setProviderId (providerId) {
    this.providerId = providerId
  },
  setUserId (userId) {
    this.userId = userId
  },
  setUserAuth (userAuth) {
    this.userAuth = userAuth
  },
  setUserType (userType) {
    this.userType = userType
  },
  setUserInfo (userInfo) {
    this.userInfo = userInfo
  },

  setCrccNodeProvider (crccNodeProvider) {
    this.crccNodeProvider = crccNodeProvider
  },
  setCrccNodeId (crccNodeId) {
    this.crccNodeId = crccNodeId
  },
  setCrccNodeName (crccNodeName) {
    this.crccNodeName = crccNodeName
  },
  setCrccNodeCode (crccNodeCode) {
    this.crccNodeCode = crccNodeCode
  },
  setCrccNodeType (crccNodeType) {
    this.crccNodeType = crccNodeType
  },
  setCrccAdminProvider (crccAdminProvider) {
    this.crccAdminProvider = crccAdminProvider
  },
  setCrccAdminId (crccAdminId) {
    this.crccAdminId = crccAdminId
  },
  setCrccAdminName (crccAdminName) {
    this.crccAdminName = crccAdminName
  },

  setObjProvider (objProvider) {
    this.objProvider = objProvider
  },
  setObjId (objId) {
    this.objId = objId
  },
  setObjType (objType) {
    this.objType = objType
  },
  setObjPostId (objPostId) {
    this.objPostId = objPostId
  },

  setNodeProvider (nodeProvider) {
    this.nodeProvider = nodeProvider
  },
  setNodeId (nodeId) {
    this.nodeId = nodeId
  },
  setNodeCode (nodeCode) {
    this.nodeCode = nodeCode
  },
  setNodeType (nodeType) {
    this.nodeType = nodeType
  }
}
