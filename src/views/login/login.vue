<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autocomplete="on"
        :model="loginForm"
        ref="loginForm"
        label-position="left"
      >
        <div style="text-align: center">
          <svg-icon icon-class="crcc" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div>
        <h2 class="login-title color-main">mall-admin-web</h2>
        <el-form-item prop="username">
          <el-input
            name="username"
            type="text"
            v-model="loginForm.username"
            autocomplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon :icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 50%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from '@/utils/baseAxios'
import LoginApi from '@/api/login'// 引入登录 api 接口

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loading: false,
      pwdType: 'password',
      eye: 'eye-hide'
    }
  },
  created () {
    switch (process.env.NODE_ENV) { // 注意变量名是自定义的
      case 'development':
        axios.axiosBaseUrl('/login')
        break
      case 'production':
        axios.axiosBaseUrl('http://localhost:8089')
        break
    }
  },
  methods: {
    showPwd () {
      const _this = this
      if (_this.pwdType === 'password') {
        _this.pwdType = ''
        _this.eye = 'eye-show'
      } else {
        _this.pwdType = 'password'
        _this.eye = 'eye-hide'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
            .then(response => {
              this.loading = false
              const code = response.data.code
              if (code === 200) {
                this.$router.push({
                  path: '/success',
                  query: { data: response.data.data }
                })
              } else {
                alert(JSON.stringify(response.data))
                this.$router.push({
                  path: '/error',
                  query: { message: response.data.msg }
                })
              }
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          // eslint-disable-next-line no-console
          console.log('参数验证不合法！')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 300px;
    margin: 140px auto;
    border-top: 10px solid #409eff;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409eff;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
