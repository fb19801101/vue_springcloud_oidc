<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ msgCn }}</h1>
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button @click="loginClick">Login</el-button>
      <el-button @click="logoutClick">Logout</el-button>
      <el-button @click="currentUserInfo">CurrentUserInfo</el-button>
      <el-button @click="getUserInfo">GetUserInfo</el-button>
    </div>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <el-form label-width="100px">
      <h3>客户端登录</h3>
      <br>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label="providerId">
            <el-input
              v-model="providerId"
              placeholder="股份公司HR系统用户所在二级单位ID"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="userId">
            <el-input
              v-model="userId"
              placeholder="股份公司HR系统用户ID"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <h3>用户信息</h3>
      <br>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label="id">
            <el-input
              v-model="userInfo.id"
              placeholder="用户的ID"
              readonly="readonly"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="name">
            <el-input
              v-model="userInfo.name"
              placeholder="用户的姓名"
              readonly="readonly"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label="gender">
            <el-input
              v-model="userInfo.gender"
              placeholder="用户的性别"
              readonly="readonly"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="category">
            <el-input
              v-model="userInfo.catagory"
              placeholder="用户的人员类别"
              readonly="readonly"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-form-item label="positionStatus">
            <el-input
              v-model="userInfo.positionStatus"
              placeholder="用户的岗位状态"
              readonly="readonly"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="order">
            <el-input
              v-model="userInfo.order"
              placeholder="用户的排序号"
              readonly="readonly"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import LoginApi from '@/api/login'

export default {
  name: 'HelloWorld',
  data () {
    return {
      providerId: '',
      userId: 0,
      userInfo: [],
      message: {
        data: {
          id: 1,
          name: '张三'
        },
        browse: 1,
        authorizationManage: 1,
        log: 1,
        authorizationInquire: 1,
        jobChangeInquire: 1,
        jobDeleteInquire: 1
      }
    }
  },
  props: {
    msg: String,
    msgCn: {
      type: String,
      default: '欢迎来到 Vue.js 教程'
    }
  },
  methods: {
    loginClick: function () {
      LoginApi.redirectLogin()
        .then(res => {
          window.location = res.data
        })
        .catch(err => {
          console.log(err)
        })
      this.$store.dispatch('updateTabPaneTitle', this.message)
      this.$router.replace('/demo/browser')
    },
    logoutClick: function () {
      LoginApi.redirectLogout()
        .then(res => {
          window.location = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    currentUserInfo: function () {
      LoginApi.currentUserInfo()
        .then(res => {
          console.log(res.data)
          this.providerId = res.data.providerId
          this.userId = res.data.userId
        })
        .catch(err => {
          console.log(err)
        })
    },
    getUserInfo: function () {
      LoginApi.getUserInfo(this.providerId, this.userId)
        .then(res => {
          console.log(res.data)
          this.userInfo = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
