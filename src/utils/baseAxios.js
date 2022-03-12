import axios from 'axios' // 引入 axios
import BaseUrl from './baseUrl' // 使用环境变量 + 模式的方式定义基础URL
// import GUID from './guid' // 引入 GUID

// 创建 axios 实例
const ajax = axios.create({
  baseURL: BaseUrl, // 配置接口地址
  timeout: 50000, // 请求超时时间
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
    }
  }
})

// 添加请求拦截器
ajax.interceptors.request.use((config) => {
  // 在发送请求前，比如添加用户uid，token等公共的参数,根据实际情况配置
  // 写入token存储，用【localstorage】本地缓存进行存储
  const token = window.sessionStorage.getItem('accessToken')
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  // if (token != null) {
  //   token = token + ':' + GUID.newGUID()
  // } else {
  //   token = GUID.newGUID()
  //   window.sessionStorage.setItem('accessToken', token)
  // }

  // var uid = window.sessionStorage.getItem('uid')
  // // 判断参数是否存在uid，如果存在的话，则每个参数中都加上uid
  // if (uid) {
  //   uid = 'uid-001'
  // }

  // console.log(token)
  config.headers.Authorization = token
  // if (config.method === 'post') {
  //   config.data.uid = uid
  // } else if (config.method === 'get') {
  //   config.params.uid = uid
  // }

  return config
}, (error) => {
  return Promise.reject(error) // reject抛出错误的值，会出现在回调的catch回调里面
})

// 添加响应拦截器,返回状态判断
ajax.interceptors.response.use((res) => {
  // 对响应数据判断，此处的判断也是根据你的后台实际返回值进行判断，我这里只是个实例
  if (res.status === 200) {
    return Promise.resolve(res) // reject抛出正确的值，会出现在回调的then回调里面
  } else {
    console.log(res.data.msg) // 提示后台返回的错误值
  }
  return res
}, (error) => {
  return Promise.reject(error)
})

// 设置基础URL
export function axiosBaseUrl (url) {
  ajax.defaults.baseURL = url
}

// 发送post请求,返回一个Promise
export function axiosPost (url, params) {
  return new Promise((resolve, reject) => {
    ajax.post(url, params)
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 发送get请求,返回一个Promise
export function axiosGet (url, param) {
  return new Promise((resolve, reject) => {
    ajax.get(url, {
      params: param
    })
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  axiosBaseUrl,
  axiosPost,
  axiosGet
}
