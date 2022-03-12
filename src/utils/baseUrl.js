let BaseUrl = ''

switch (process.env.NODE_ENV) { // 注意变量名是自定义的
  case 'development':
    BaseUrl = process.env.VUE_APP_REQUEST_URL // 'http://192.168.121.40:12199' // 开发环境url
    break
  case 'production':
    BaseUrl = process.env.VUE_APP_REQUEST_URL // 'http://192.168.120.199:12199' // 生产环境url
    break
}

export default BaseUrl
