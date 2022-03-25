// SessionStorage Login Info Init

export default {
  providerId: sessionStorage.getItem('ProviderId'),
  userId: parseInt(sessionStorage.getItem('UserId')),
  userAuth: sessionStorage.getItem('UserAuth'),
  userType: sessionStorage.getItem('UserType'),
  userInfo: JSON.parse(sessionStorage.getItem('UserInfo')),
  crccNodeProvider: sessionStorage.getItem('CRCCNodeProvider'),
  crccNodeId: parseInt(sessionStorage.getItem('CRCCNodeId')),
  crccNodeName: sessionStorage.getItem('CRCCNodeName'),
  crccNodeCode: sessionStorage.getItem('CRCCNodeCode'),
  crccNodeType: parseInt(sessionStorage.getItem('CRCCNodeType')),
  crccAdminProvider: sessionStorage.getItem('CRCCAdminProvider'),
  crccAdminId: parseInt(sessionStorage.getItem('CRCCAdminId')),
  crccAdminName: sessionStorage.getItem('CRCCAdminName'),

  objProvider: sessionStorage.getItem('ObjProvider'),
  objId: parseInt(sessionStorage.getItem('ObjId')),
  objType: parseInt(sessionStorage.getItem('ObjType')),
  objPostId: parseInt(sessionStorage.getItem('ObjPostId')),

  nodeProvider: sessionStorage.getItem('NodeProvider'),
  nodeId: parseInt(sessionStorage.getItem('NodeId')),
  nodeCode: sessionStorage.getItem('NodeCode'),
  nodeType: parseInt(sessionStorage.getItem('NodeType')),

  setProviderId (providerId) {
    this.providerId = providerId
    sessionStorage.setItem('ProviderId', this.providerId)
  },
  setUserId (userId) {
    this.userId = userId
    sessionStorage.setItem('UserId', this.userId + '')
  },
  setUserAuth (userAuth) {
    this.userAuth = userAuth
    sessionStorage.setItem('UserAuth', this.userAuth)
  },
  setUserType (userType) {
    this.userType = userType
    sessionStorage.setItem('UserType', this.userType)
  },
  setUserInfo (userInfo) {
    this.userInfo = userInfo
    sessionStorage.setItem('UserInfo', JSON.stringify(userInfo))
  },

  setCrccNodeProvider (crccNodeProvider) {
    this.crccNodeProvider = crccNodeProvider
    sessionStorage.setItem('CRCCNodeProvider', this.crccNodeProvider)
  },
  setCrccNodeId (crccNodeId) {
    this.crccNodeId = crccNodeId
    sessionStorage.setItem('CRCCNodeId', this.crccNodeId + '')
  },
  setCrccNodeName (crccNodeName) {
    this.crccNodeName = crccNodeName
    sessionStorage.setItem('CRCCNodeName', this.crccNodeName)
  },
  setCrccNodeCode (crccNodeCode) {
    this.crccNodeCode = crccNodeCode
    sessionStorage.setItem('CRCCNodeCode', this.crccNodeCode)
  },
  setCrccNodeType (crccNodeType) {
    this.crccNodeType = crccNodeType
    sessionStorage.setItem('CRCCNodeType', this.crccNodeType + '')
  },
  setCrccAdminProvider (crccAdminProvider) {
    this.crccAdminProvider = crccAdminProvider
    sessionStorage.setItem('CRCCAdminProvider', this.crccAdminProvider)
  },
  setCrccAdminId (crccAdminId) {
    this.crccAdminId = crccAdminId
    sessionStorage.setItem('CRCCAdminId', this.crccAdminId + '')
  },
  setCrccAdminName (crccAdminName) {
    this.crccAdminName = crccAdminName
    sessionStorage.setItem('CRCCAdminName', this.crccAdminName)
  },

  setObjProvider (objProvider) {
    this.objProvider = objProvider
    sessionStorage.setItem('ObjProvider', this.objProvider)
  },
  setObjId (objId) {
    this.objId = objId
    sessionStorage.setItem('ObjId', this.objId + '')
  },
  setObjType (objType) {
    this.objType = objType
    sessionStorage.setItem('ObjType', this.objType + '')
  },
  setObjPostId (objPostId) {
    this.objPostId = objPostId
    sessionStorage.setItem('ObjPostId', this.objPostId + '')
  },

  setNodeProvider (nodeProvider) {
    this.nodeProvider = nodeProvider
    sessionStorage.setItem('NodeProvider', this.nodeProvider)
  },
  setNodeId (nodeId) {
    this.nodeId = nodeId
    sessionStorage.setItem('NodeId', this.nodeId + '')
  },
  setNodeCode (nodeCode) {
    this.nodeCode = nodeCode
    sessionStorage.setItem('NodeCode', this.nodeCode)
  },
  setNodeType (nodeType) {
    this.nodeType = nodeType
    sessionStorage.setItem('NodeType', this.nodeType + '')
  }
}
