<template>
  <div class="flex-container-admin">
    <div class="flex-header">
      <div class="flex-icon">
        <i class="el-icon-s-fold text-title-32" @click="boxShow = !boxShow" v-if="boxShow"/>
        <i class="el-icon-s-unfold text-title-32" @click="boxShow = !boxShow" v-if="!boxShow"/>
      </div>
      <div class="flex-title">
        <span class="text-title-24"> DEMO 技术认证</span>
      </div>
      <div class="flex-info">
        <span class="text-title-20"> Flex-Info</span>
      </div>
      <div class="flex-menu">
        <span class="text-title-20"> Flex-Menu</span>
      </div>
      <div class="flex-login">
        <label-login @boxShow="boxShow = $event" :userName="userName"/>
      </div>
    </div>
    <div class="flex-admin">
      <transition name="draw">
        <div class="flex-aside" v-if="boxShow">
          <span class="flex-title text-title-20" @click="boxShowMenu = !boxShowMenu">应用聚合</span>
          <navigation-menu class="flex-menu"/>
          <el-divider v-if="boxShowMenu"></el-divider>
          <span class="flex-title text-title-20 box-margin-bottom-12" @click="boxShowTodoList = !boxShowTodoList" v-if="boxShowMenu">代办聚合</span>
          <navigation-todo-list v-if="boxShowTodoList"/>
          <el-divider v-if="boxShowMenu"></el-divider>
          <span class="flex-title text-title-20 box-margin-bottom-12" @click="boxShowPresses = !boxShowPresses" v-if="boxShowMenu">消息聚合</span>
          <navigation-presses v-if="boxShowPresses"/>
        </div>
      </transition>
      <div class="flex-body">
        <layout-page/>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu'
import NavigationTodoList from '@/components/NavigationMenu/NavigationTodoList'
import NavigationPresses from '@/components/NavigationMenu/NavigationPresses'
import LayoutPage from '@/components/LayoutTabs/LayoutPage'
import LabelLogin from '@components/LabelLogin/LabelLogin'
import LoginApi from '@/api/login'

export default {
  name: 'demo',
  components: { NavigationMenu, NavigationTodoList, NavigationPresses, LayoutPage, LabelLogin },
  data () {
    return {
      boxShow: true,
      boxShowMenu: false,
      boxShowTodoList: false,
      boxShowPresses: false,
      userAuth: {
        browseWeb: 0,
        browseApp: 0,
        systemAuth: 0,
        systemLog: 0,
        queryAuth: 0,
        queryPostChange: 0,
        queryOrgDelete: 0,
        planCompute: 1,
        planParams: 1,
        planStatic: 1,
        planEstimate: 1,
        planActual: 1,
        planTree: 1,
        apiHolder: 2
      },
      userName: ''
    }
  },
  created () {
    this.userName = this.global.userInfo != null ? this.global.userInfo.name : ''
    if (this.$store.state.accessToken != null) {
      this.$store.commit('Login')

      if (this.global.providerId != null && this.global.userId != null) {
        LoginApi.currentUserInfo(this.global.providerId, this.global.userId)
          .then(res => {
            if (res.data.code === 200) {
              this.global.setUserInfo(res.data.data)
              this.userName = res.data.data.name
              LoginApi.currentUserAuth(this.global.providerId, this.global.userId)
                .then(res => {
                  if (res.data.code === 200) {
                    this.global.setObjProvider(res.data.data.objProvider)
                    this.global.setObjId(res.data.data.objId)
                    this.global.setObjType(res.data.data.objType)
                    this.global.setObjPostId(res.data.data.objPostId)

                    this.global.setNodeProvider(res.data.data.nodeProvider)
                    this.global.setNodeId(res.data.data.nodeId)
                    this.global.setNodeCode(res.data.data.nodeCode)
                    this.global.setNodeType(res.data.data.nodeType)

                    this.userAuth.browseWeb = res.data.data.authOrg
                    this.userAuth.browseApp = res.data.data.authOrg
                    this.userAuth.systemAuth = res.data.data.authOpAuth
                    this.userAuth.systemLog = res.data.data.authLog
                    this.userAuth.queryAuth = res.data.data.authQueryAuth
                    this.userAuth.queryPostChange = res.data.data.authPostChange
                    this.userAuth.queryOrgDelete = res.data.data.authPostDelete
                    this.$store.commit('updateUserAuth', this.userAuth)
                  } else {
                    this.$message.error('您暂无系统权限')
                  }
                }).catch(err => {
                  console.log(err)
                })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.userInfo()
      }
    } else {
      this.accessToken()
    }
  },
  mounted () {
    LoginApi.currentCRCCNodeAndAdmin().then((res) => {
      this.global.setCrccAdminProvider(res.data.data.crccAdminProvider)
      this.global.setCrccAdminId(res.data.data.crccAdminId)
      this.global.setCrccAdminName(res.data.data.crccAdminName)
      this.global.setCrccNodeProvider(res.data.data.crccNodeProvider)
      this.global.setCrccNodeId(res.data.data.crccNodeId)
      this.global.setCrccNodeName(res.data.data.crccNodeName)
      this.global.setCrccNodeCode(res.data.data.crccNodeCode)
      this.global.setCrccNodeType(res.data.data.crccNodeType)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    accessToken () {
      LoginApi.accessToken()
        .then(res => {
          if (res.data.code === 200 && this.$store.state.accessToken == null) {
            this.$store.commit('updateAccessToken', res.data.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    userInfo () {
      LoginApi.userInfo()
        .then(res => {
          if (res.data.code === 200) {
            const providerId = res.data.data.providerId
            const userId = res.data.data.userId
            const userAuth = res.data.data.userAuth
            const userType = res.data.data.userType

            this.global.setProviderId(providerId)
            this.global.setUserId(userId)
            this.global.setUserAuth(userAuth)
            this.global.setUserType(userType)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
  body {
    margin: 0;
  }

  .draw-enter-active, .draw-leave-active {
    transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0) ease;
  }

  .draw-enter, .draw-leave-to {
    width: 0;
    opacity: 0;
    transform: translateX(0);
  }

  .el-divider {
    background-color: $white;
    height: 2px;
  }
</style>
