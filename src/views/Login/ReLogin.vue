<template>
  <div style="height: 700px">
    <div class="login-box" style="text-align: center">
      <div style="margin-top: 30px">
        <span style="font-weight: 700;font-size: 32px;color: #303133;">您无任何权限，请联系管理员授权</span>
        <p style="margin-top: 10px">You do not have any rights </p>
        <p style="margin-top: -10px">please contact the administrator for authorization</p>
      </div>
      <div style="margin-top: 100px">
        <el-button type="primary" style="width: 200px;" @click="logout">重新登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ReLogin',
  data () {
    return {
      message: {
        data: {
          id: 1,
          name: ''
        },
        browsePage: 0,
        browseWeb: 0,
        browseApp: 0,
        systemManage: 0,
        systemAuth: 0,
        systemLog: 0,
        systemQuery: 0,
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
      }
    }
  },
  methods: {
    logout: function () {
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
