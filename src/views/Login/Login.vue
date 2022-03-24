<template>
  <!--  <div style="height: 700px">-->
  <!--    <div class="login-box" style="text-align: center">-->
  <!--      <div style="margin-top: 30px">-->
  <!--        <span style="font-weight: 700;font-size: 32px;color: #303133;">欢迎进入信息化技术验证DEMO系统</span>-->
  <!--        <p style="margin-top: 0">Welcome to the information technology verification DEMO system</p>-->
  <!--      </div>-->
  <!--      <div style="margin-top: 100px">-->
  <!--        <p>点击登录表示你已同意-->
  <!--          <el-link type="primary">服务协议</el-link>-->
  <!--        </p>-->
  <!--        <el-button type="primary" style="width: 200px;" @click="loginClick">登录</el-button>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import LoginApi from '@/api/login'

export default {
  name: 'Login',
  data () {
    return {}
  },
  created () {
    // 获取get参数
    var providerId = this.getQueryVariable('providerId')
    var userId = this.getQueryVariable('userId')
    var userAuth = this.getQueryVariable('userAuth')
    var userType = this.getQueryVariable('userType')

    // 获取RedirectAttributes  addFlashAttribute参数 sessioon
    // console.log(sessionStorage)
    // var token = sessionStorage['org.springframework.web.servlet.support.SessionFlashMapManager.FLASH_MAPS'][0]['token']

    if (userAuth != null) {
      this.clearQueryVariable()
      this.global.setProviderId(providerId)
      this.global.setUserId(userId)
      this.global.setUserAuth(userAuth)
      this.global.setUserType(userType)

      this.$store.dispatch('initializeLoginState')
      this.$store.dispatch('updateLayoutDevice', userType)

      this.$http.get(process.env.VUE_APP_REQUEST_URL + '/api/access_token')
        .then(res => {
          if (res.data.code === 200 && this.$store.state.accessToken == null) {
            this.$store.dispatch('updateAccessToken', res.data.data)
            if (userAuth === 'has_auth') {
              this.$router.push('demo/home')
            } else if (userAuth === 'no_auth') {
              this.$router.push('re-login')
            }
          }
        }).catch(err => {
          console.log(err)
        })
    } else {
      this.loginClick()
    }
  },
  methods: {
    loginClick () {
      LoginApi.redirectLogin()
        .then(res => {
          if (res.data.code === 200) {
            // alert(res.data.data)
            window.location = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })

      // this.$router.replace('/demo/home')
    },
    clearQueryVariable () {
      // 获取当前页面的url
      var url = window.location.href
      // 判断是否存在参数
      if (url.indexOf('?') !== -1) {
        // 去除参数
        url = url.replace(/([?#])[^'"]*/, '')
        window.history.pushState({}, 0, url)
      }
    },
    getQueryVariable (variable) {
      var query = window.location.search.substring(1)
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] === variable) {
          return pair[1]
        }
      }
      return null
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login-box {
    width: 600px;
    height: 400px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -200px 0 0 -300px;
    border-radius: 10px;
    background-color: #F2F6FC;
  }
</style>
