<template>
  <div>
      <span class="text-content-24">|</span>
      <span class="text-content-18 box-margin-left-8">{{userName}}</span>
      <i class="el-icon-refresh icon-size-24 box-margin-left-8" @click="refreshOrganization"/>
      <i class="el-icon-switch-button icon-size-24 box-margin-left-6" @click="loginOut"/>
  </div>
</template>

<script>
import LoginApi from '@/api/login'

export default {
  name: 'LabelLogin',
  props: {
    userName: String
  },
  data () {
    return {
      userAuth: {
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
    }
  },
  created () {
    // LoginApi.getUserInfo(this.global.providerId, this.global.userId)
    //   .then(res => {
    //     if(res.data.code === 200) {
    //       this.global.setUserInfo(res.data.data)
    //       this.userName = res.data.data.name
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  },
  methods: {
    refreshOrganization () {
      LoginApi.queryAuth(this.global.providerId, this.global.userId)
        .then(res => {
          if (res.data.code === 200) {
            this.global.setObjProvider(res.data.data.objProvider)
            this.global.setObjId(res.data.data.objId)
            this.global.setObjType(res.data.data.objType)
            this.global.setObjPostId(res.data.data.objPostId)

            this.global.setNodeProvider(res.data.data.nodeProvider)
            this.global.setNodeId(res.data.data.nodeId)
            this.global.setNodeType(res.data.data.nodeType)

            this.userAuth.browseWeb = res.data.data.authOrg
            this.userAuth.browseApp = res.data.data.authOrg
            this.userAuth.systemAuth = res.data.data.authOpAuth
            this.userAuth.systemLog = res.data.data.authLog
            this.userAuth.queryAuth = res.data.data.authQueryAuth
            this.userAuth.queryPostChange = res.data.data.authPostChange
            this.userAuth.queryOrgDelete = res.data.data.authPostDelete
            this.$store.dispatch('updateUserAuth', this.userAuth)
          } else {
            this.$message.error('您暂无系统权限')
          }

          this.$store.dispatch('updateTabPaneTitle', '首页')
          this.$store.dispatch('initializeLoginState')
        }).catch(err => {
          console.log(err)
        })
    },
    loginOut () {
      const url = 'https://g1openid.crcc.cn/logout' // 要打开的网页地址
      // const url = 'https://sso.crcc.cn/logout' // 要打开的网页地址
      const features = 'height=500, width=800, top=100, left=100, toolbar=no, menubar=no,scrollbars=no,resizable=no, location=no, status=no' // 设置新窗口的特性
      // 动态生成一个超链接
      const me = window.open(url, 'newW', features) // 打开新窗口
      setTimeout(function () { // 定时器
        if (!me.close()) {
          // eslint-disable-next-line no-unused-expressions
          me.closed
        }

        window.location.href = 'http://' + process.env.VUE_APP_LOCAL_HOST + ':' + process.env.VUE_APP_LOCAL_PORT + process.env.VUE_APP_LOCAL_PAHT
      }, 1000) // 半秒钟之后关闭该窗口

      this.$store.dispatch('initializeSessionStorage')
    }
  }
}
</script>

<style lang="stylus" scoped>
  i {
     cursor: pointer
   }
  i:hover {
    background: $black
    opacity: 1;
    color $light-blue
  }
</style>
