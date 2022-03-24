<template>
  <div class="flex-container-admin">
    <div class="flex-header">
      <div class="flex-icon">
        <svg-icon icon-class="crcc-white" class-name="icon-size-48" style="border: 1px solid #ffffff" @svgEvent="layoutShowBrowser = !layoutShowBrowser"></svg-icon>
      </div>
      <div class="flex-icon" v-if="layoutShowBrowser">
        <i class="el-icon-s-fold icon-size-32" @click="boxShowAside = !boxShowAside" v-if="boxShowAside"/>
        <i class="el-icon-s-unfold icon-size-32" @click="boxShowAside = !boxShowAside" v-if="!boxShowAside"/>
      </div>
      <div class="flex-title">
        <span class="text-title-24"> DEMO 技术认证</span>
      </div>
      <div class="flex-info" v-if="layoutShowBrowser">
        <el-select placeholder="请选择调转地址类型" size="mini" value="localhost">
          <el-option value="localhost" label="http://localhost/"></el-option>
          <el-option value="197" label="http://192.168.100.197/"></el-option>
          <el-option value="198" label="http://192.168.100.198/"></el-option>
          <el-option value="199" label="http://192.168.100.199/"></el-option>
          <el-option value="ldsc" label="http://ldsc.cr121.com/"></el-option>
          <el-option value="ames" label="http://ames.cr121.com/"></el-option>
        </el-select>
      </div>
      <div class="flex-menu" v-if="layoutShowBrowser">
          <el-button type="success" class="text-title-16" plain size="mini" @click="clickBrowserApp">组织人员浏览</el-button>
          <el-button type="info" class="text-title-16" plain size="mini" @click="clickQueryAuth">分级授权查询</el-button>
          <el-button type="danger" class="text-title-16" plain size="mini" @click="clickApiHolder"> API注册信息</el-button>
          <el-button type="primary" class="text-title-16" plain size="mini" @click="clickSystemAuth">系统管理</el-button>
      </div>
      <div class="flex-login">
        <label-login :userName="userName"/>
      </div>
    </div>
    <div class="flex-admin">
      <transition name="draw" v-if="layoutShowBrowser">
        <div class="flex-aside" v-if="boxShowAside">
          <span class="flex-title text-title-16" @click="boxShowTodoList = !boxShowTodoList, boxShowPresses=false">代办聚合</span>
          <span class="flex-title text-title-16" @click="boxShowPresses = !boxShowPresses, boxShowTodoList=false">消息聚合</span>
          <navigation-menu class="flex-menu"/>
          <el-divider v-if="boxShowTodoList || boxShowPresses"></el-divider>
          <navigation-collapse :items='todoList' v-if="boxShowTodoList && !boxShowPresses"/>
          <navigation-collapse :items='presses' v-if="boxShowPresses && !boxShowTodoList"/>
        </div>
      </transition>
      <div class="flex-body">
        <layout-page/>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationMenu from '@/components/Navigation/NavigationMenu'
import NavigationCollapse from '@/components/Navigation/NavigationCollapse'
import LayoutPage from '@/components/LayoutTabs/LayoutPage'
import LabelLogin from '@components/LabelLogin/LabelLogin'
import SvgIcon from '@/components/SvgIcon/SvgIcon'
import LoginApi from '@/api/login'

export default {
  name: 'demo',
  components: { NavigationMenu, NavigationCollapse, LayoutPage, LabelLogin, SvgIcon },
  data () {
    return {
      layoutShowBrowser: true,
      boxShowAside: true,
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

        planParams: 1,
        planStatic: 1,
        planEstimate: 1,
        planActual: 1,
        planTree: 1,

        apiHolder: 1
      },
      userName: '',
      todoList: [
        { name: 'SystemAuth', title: '授权管理', icon: 'el-icon-setting', content: ['甘忠忠：股份公司/十二局集团', '请进行分级授权'], disabled: true },
        { name: 'ApiHolder', title: 'API注册信息', icon: 'el-icon-setting', content: ['跳转所有应用注册信息页面'], disabled: false },
        { name: 'BrowserWeb', title: '网页端页面', icon: 'el-icon-setting', content: ['跳转组织人员信息查询页面'], disabled: false }
      ],
      presses: [
        { name: 'PlanParams', title: '网络计算参数', icon: 'el-icon-warning-outline', content: ['跳转至网络计划参数详情'], disabled: false },
        { name: 'SystemLog', title: '系统日志', icon: 'el-icon-warning-outline', content: ['甘忠忠：十二局集团/部长/甘忠忠', '系统日志信息详情', '业务功能日志信息详情'], disabled: false },
        { name: 'BrowserApp', title: '移动端页面', icon: 'el-icon-warning-outline', content: ['查看移动端页面'], disabled: false }
      ]
    }
  },
  watch: {
    layoutShowBrowser: function () {
      this.$store.dispatch('updateLayoutDevice', this.layoutShowBrowser ? 'browse' : 'mobile')
      this.$store.dispatch('updateTabPaneName', this.layoutShowBrowser ? 'BrowserWeb' : 'BrowserApp')
    }
  },
  beforeCreate () {
    this.userName = this.global.userInfo != null ? this.global.userInfo.name : ''
    if (this.$store.state.accessToken != null) {
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
                    this.$store.dispatch('updateUserAuth', this.userAuth)
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
  created () {
    const routes = this.$router.options.routes[2].children
    routes.forEach(route => {
      const path = route.path
      if ('children' in route) {
        const children = [...route.children]
        children.forEach(route => {
          route.path = path + '/' + route.path
          this.$store.dispatch('addRoutedView', route)
        })
      } else {
        this.$store.dispatch('addRoutedView', route)
      }
    })
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
            this.$store.dispatch('updateAccessToken', res.data.data)
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
    },
    clickBrowserApp () {
      this.$store.dispatch('updateLayoutDevice', 'mobile')
      this.$store.dispatch('updateTabPaneName', 'BrowserApp')
    },
    clickQueryAuth () {
      this.$store.dispatch('updateLayoutDevice', 'browser')
      this.$store.dispatch('updateTabPaneName', 'QueryAuth')
    },
    clickApiHolder () {
      this.$store.dispatch('updateLayoutDevice', 'browser')
      this.$store.dispatch('updateTabPaneName', 'ApiHolder')
    },
    clickSystemAuth () {
      this.$store.dispatch('updateLayoutDevice', 'browser')
      this.$store.dispatch('updateTabPaneName', 'SystemAuth')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .draw-enter-active, .draw-leave-active {
    transition: all 0.8s cubic-bezier(1.0, 0.5, 0.8, 1.0) ease;
  }

  .draw-enter, .draw-leave-to {
    width: 0;
    opacity: 0;
    transform: translateX(0);
  }

  .el-divider {
    background-color: $yellow;
    height: 2px;
  }
</style>
