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
        <el-dropdown>
          <el-button type="success" class="text-title-16" plain size="mini">
            <svg-icon icon-class="sub-group" class-name="icon-size-16"></svg-icon> ToastUI
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="box-margin-top-10">
              <el-button type="primary" class="text-title-16" plain size="mini" @click="clickToastUiViewer">
                <svg-icon icon-class="sub-unit" class-name="icon-size-16"></svg-icon> TuiViewer
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item class="box-margin-top-10">
              <el-button type="primary" class="text-title-16" plain size="mini" @click="clickToastUiEditor">
                <svg-icon icon-class="sub-unit" class-name="icon-size-16"></svg-icon> TuiEditor
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item class="box-margin-top-10 box-margin-bottom-10">
              <el-button type="primary" class="text-title-16" plain size="mini" @click="clickToastUiGrid">
                <svg-icon icon-class="sub-unit" class-name="icon-size-16"></svg-icon> TuiGrid
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item class="box-margin-top-10 box-margin-bottom-10">
              <el-button type="primary" class="text-title-16" plain size="mini" @click="clickToastUiChart">
                <svg-icon icon-class="sub-unit" class-name="icon-size-16"></svg-icon> TuiChart
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="box-margin-left-10">
          <el-button type="success" class="text-title-16" plain size="mini">
            <svg-icon icon-class="todo" class-name="icon-size-16"></svg-icon> 代办聚合
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="box-margin-top-10">
              <el-button type="danger" class="text-title-16" plain size="mini" @click="clickInitTodo">
                <svg-icon icon-class="todo-info" class-name="icon-size-16"></svg-icon>代办聚合
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item class="box-margin-top-10">
              <el-button type="warning" class="text-title-16" plain size="mini" :disabled="!todoApiHolder" @click="clickSetTodoNumber">
                <svg-icon icon-class="todo-info" class-name="icon-size-16"></svg-icon>处理代办
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item class="box-margin-top-10 box-margin-bottom-10">
              <el-button type="danger" class="text-title-16" plain size="mini" @click="clickClearTodo">
                <svg-icon icon-class="todo-info" class-name="icon-size-16"></svg-icon>清空代办
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="box-margin-left-10">
          <el-button type="success" class="text-title-16" plain size="mini">
            <svg-icon icon-class="presses" class-name="icon-size-16"></svg-icon> 消息聚合
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="box-margin-top-10">
              <el-button type="danger" class="text-title-16" plain size="mini" @click="clickInitPresses">
                <svg-icon icon-class="presses" class-name="icon-size-16"></svg-icon>消息聚合
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item class="box-margin-top-10">
              <el-button type="primary" class="text-title-16" plain size="mini" @click="clickAddPressesItem">
                <svg-icon icon-class="presses-info" class-name="icon-size-16"></svg-icon>添加消息
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item class="box-margin-top-10">
              <el-button type="warning" class="text-title-16" plain size="mini" :disabled="!pressesRedFile" @click="clickUnreadRedFile">
                <svg-icon icon-class="presses-info" class-name="icon-size-16"></svg-icon>已读红头
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item class="box-margin-top-10">
              <el-button type="warning" class="text-title-16" plain size="mini" :disabled="!pressesRegGuide" @click="clickUnreadRegGuide">
                <svg-icon icon-class="presses-info" class-name="icon-size-16"></svg-icon>已读注册
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item class="box-margin-top-10 box-margin-bottom-10">
              <el-button type="danger" class="text-title-16" plain size="mini" @click="clickClearPresses">
                <svg-icon icon-class="presses-info" class-name="icon-size-16"></svg-icon>清空消息
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="flex-login">
        <label-login :userName="userName"/>
      </div>
    </div>
    <div class="flex-admin">
      <transition name="draw" v-if="layoutShowBrowser">
        <div class="flex-aside" v-if="boxShowAside">
          <span class="flex-title text-title-16" @click="boxShowTodo = !boxShowTodo, boxShowPresses=false">代办聚合</span>
          <span class="flex-title text-title-16" @click="boxShowPresses = !boxShowPresses, boxShowTodo=false">消息聚合</span>
          <navigation-menu class="flex-menu"/>
          <el-divider v-if="boxShowTodo || boxShowPresses"></el-divider>
          <navigation-collapse :items='todo' v-if="boxShowTodo && !boxShowPresses"/>
          <navigation-collapse :items='presses' v-if="boxShowPresses && !boxShowTodo"/>
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
import NavRouter from '@router/modules/nav'
import PressesRouter from '@router/modules/presses'
import TodoRouter from '@router/modules/todo'
import ToastRouter from '@router/modules/toast'
import LoginApi from '@/api/login'

export default {
  name: 'demo',
  components: { NavigationMenu, NavigationCollapse, LayoutPage, LabelLogin, SvgIcon },
  data () {
    return {
      layoutShowBrowser: true,
      boxShowAside: true,
      boxShowTodo: false,
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
      todo: [],
      presses: [],
      todoNumber: 0,
      todoApiHolder: false,
      pressesRedFile: false,
      pressesRegGuide: false,
      clientWidth: 0
    }
  },
  watch: {
    layoutShowBrowser: function () {
      this.boxShowAside = !!this.layoutShowBrowser
      this.$store.dispatch('updateLayoutDevice', this.layoutShowBrowser ? 'browse' : 'mobile')
      this.$store.dispatch('updateTabPaneName', this.layoutShowBrowser ? 'BrowserWeb' : 'BrowserApp')
    },
    boxShowAside: function () {
      console.log(this.boxShowAside)
      var root = document.body
      this.clientWidth = root.clientWidth
      var width = this.clientWidth - (this.boxShowAside ? 200 : 0)
      root.style.setProperty('--client-width', width + 'px')
    }
  },
  beforeCreate () {
    if (this.$store.state.routedViews.length === 0) {
      const routers = [...NavRouter, ...PressesRouter, ...TodoRouter, ...ToastRouter]
      routers.forEach(route => {
        if ('children' in route) {
          const path = route.path
          const children = [...route.children]
          children.forEach(route => {
            route.path = path + '/' + route.path
            this.$store.dispatch('addRoutedView', route)
          })
        } else {
          this.$store.dispatch('addRoutedView', route)
        }
      })
    }
  },
  created () {
    if (this.$store.state.accessToken != null) {
      if (this.global.providerId != null && this.global.userId != null) {
        this.currentUserInfo()
        this.currentUserAuth()
        this.currentUserAdmin()
        this.disabledTodo()
        this.disabledPresses('FILE-RED')
        this.disabledPresses('GUIDE-REG')
      } else {
        this.userInfo()
      }
    } else {
      this.accessToken()
    }
  },
  mounted () {
    this.$store.dispatch('initializeLoginState')
    if (this.$store.state.tabPaneTodoName != null) {
      this.boxShowAside = false
      this.$store.dispatch('updateTabPaneName', this.$store.state.tabPaneTodoName)
    }
    if (this.$store.state.tabPanePressesName != null) {
      this.boxShowAside = false
      this.$store.dispatch('updateTabPaneName', this.$store.state.tabPanePressesName)
    }

    var root = document.body
    this.clientWidth = root.clientWidth
    var width = this.clientWidth - (this.boxShowAside ? 200 : 0)
    root.style.setProperty('--client-width', width + 'px')
    window.onresize = () => {
      return (() => {
        this.clientWidth = root.clientWidth
        var width = this.clientWidth - (this.boxShowAside ? 200 : 0)
        root.style.setProperty('--client-width', width + 'px')
      })()
    }
  },
  methods: {
    async accessToken () {
      await LoginApi.accessToken()
        .then(res => {
          if (res.data.code === 200 && this.$store.state.accessToken == null) {
            this.$store.dispatch('updateAccessToken', res.data.data)
          }
        })
        .catch(err => {
          console.log(err)
        })

      if (this.global.providerId != null && this.global.userId != null) {
        await this.currentUserInfo()
        await this.currentUserAuth()
        await this.currentUserAdmin()
        await this.disabledTodo()
        await this.disabledPresses('FILE-RED')
        await this.disabledPresses('GUIDE-REG')
      } else {
        await this.userInfo()
      }
    },
    async userInfo () {
      await LoginApi.userInfo()
        .then(res => {
          if (res.data.code === 200) {
            this.global.setProviderId(res.data.data.providerId)
            this.global.setUserId(res.data.data.userId)
            this.global.setUserAuth(res.data.data.userAuth)
            this.global.setUserType(res.data.data.userType)
          }
        })
        .catch(err => {
          console.log(err)
        })

      if (this.global.providerId != null && this.global.userId != null) {
        await this.currentUserInfo()
        await this.currentUserAuth()
        await this.currentUserAdmin()
        await this.disabledTodo()
        await this.disabledPresses('FILE-RED')
        await this.disabledPresses('GUIDE-REG')
      }
    },
    currentUserInfo () {
      LoginApi.currentUserInfo(this.global.providerId, this.global.userId)
        .then(res => {
          if (res.data.code === 200) {
            this.global.setUserInfo(res.data.data)
            this.userName = res.data.data.name
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    currentUserAuth () {
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
    },
    currentUserAdmin () {
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
    disabledTodo () {
      LoginApi.getTodoNumber()
        .then(res => {
          if (res.data.code === 200 && res.data.data != null) {
            this.todoApiHolder = res.data.data > 0
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    disabledPresses (code) {
      LoginApi.getPressesItemUnread(code)
        .then(res => {
          if (res.data.code === 200 && res.data.data != null) {
            if (code === 'FILE-RED') {
              this.pressesRedFile = !res.data.data
            }
            if (code === 'GUIDE-REG') {
              this.pressesRegGuide = !res.data.data
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    delPressesItem (code) {
      LoginApi.delPressesItem(code)
        .then(res => {
          if (res.data.code === 200) {
            console.log(code + ': ' + res.data.data)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickInitTodo () {
      this.todo = [
        { name: 'ApiHolder', title: 'API注册信息', svg: 'todo-info', content: ['跳转所有应用注册信息页面'], disabled: false }
      ]
      this.todoApiHolder = true
      this.todoNumber = 2
      LoginApi.addTodo('ApiHolder', this.todoNumber)
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '代办聚合门户集成数据成功!',
              duration: 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickSetTodoNumber () {
      this.todoNumber = this.todoNumber - 1
      this.todo.map(item => {
        item.disabled = !this.todoNumber > 0
      })
      LoginApi.setTodoNumber(this.todoNumber)
        .then(res => {
          if (res.data.code === 200) {
            this.disabledTodo()
            this.$message({
              type: 'success',
              message: '代办聚合处理第 ' + this.todoNumber + ' 个代办成功!',
              duration: 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickClearTodo () {
      this.todo = []
      this.todoApiHolder = false
      LoginApi.clearTodo()
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '代办聚合门户清空数据成功!',
              duration: 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickInitPresses () {
      this.presses = [
        { name: 'RedFile', title: '红头文件', svg: 'presses-info', content: ['甘忠忠：十二局集团/部长/甘忠忠', '系统日志信息详情', '业务功能日志信息详情'], disabled: false }
      ]
      this.pressesRedFile = true
      LoginApi.addPresses('FILE-RED', '关于中铁十二局集团数字土木研究院成立的通知', 'RedFile')
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '消息聚合门户集成数据成功!',
              duration: 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickAddPressesItem () {
      this.presses.push({ name: 'RegGuide', title: '注册指南', svg: 'todo-info', content: ['跳转至网络计划参数详情'], disabled: false })
      this.pressesRegGuide = true
      LoginApi.addPressesItem('GUIDE-REG', '关于中国铁建一体化技术平台聚合对接的通报', 'RegGuide')
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '消息聚合门户添加 GUIDE-REG 数据成功!',
              duration: 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickUnreadRedFile () {
      this.presses.map(item => {
        if (item.name === 'RedFile') {
          item.disabled = this.pressesRedFile
        }
      })
      LoginApi.setPressesItemUnread('FILE-RED', true)
        .then(res => {
          if (res.data.code === 200) {
            this.disabledPresses('FILE-RED')
            this.delPressesItem('FILE-RED')

            this.$message({
              type: 'success',
              message: '消息聚合门户已读 FILE-RED 详情成功!',
              duration: 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickUnreadRegGuide () {
      this.presses.map(item => {
        if (item.name === 'RegGuide') {
          item.disabled = this.pressesRegGuide
        }
      })
      LoginApi.setPressesItemUnread('GUIDE-REG', true)
        .then(res => {
          if (res.data.code === 200) {
            this.disabledPresses('GUIDE-REG')
            this.delPressesItem('GUIDE-REG')

            this.$message({
              type: 'success',
              message: '消息聚合门户已读 GUIDE-REG 详情成功!',
              duration: 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickClearPresses () {
      this.presses = []
      this.pressesRedFile = false
      this.pressesRegGuide = false
      LoginApi.clearPresses()
        .then(res => {
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '消息聚合门户清空数据成功!',
              duration: 1000
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    clickToastUiViewer () {
      this.$store.dispatch('updateTabPaneName', 'TuiViewer')
    },
    clickToastUiEditor () {
      this.$store.dispatch('updateTabPaneName', 'TuiEditor')
    },
    clickToastUiGrid () {
      this.$store.dispatch('updateTabPaneName', 'TuiGrid')
    },
    clickToastUiChart () {
      this.$store.dispatch('updateTabPaneName', 'TuiChart')
    }
  }
}
</script>

<style lang="stylus" scoped>
  :root {
    --client-width: 0px;
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
    background-color: $grey-gold;
    height: 2px;
  }

  .flex-menu {
    svg {
      cursor: pointer
    }
    svg:hover {
      background: transparent;
      opacity: 1;
      color: $black;
    }
  }
</style>
