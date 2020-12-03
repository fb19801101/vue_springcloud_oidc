import axios from '@/utils/baseAxios'

export default {
  login: function (username, password) {
    return axios.axiosPost('/login/loginAction', {
      id: -1,
      name: '操作员',
      username: username,
      password: password
    })
  },
  addLogin: function (username, password) {
    return axios.axiosPost('/login/addLogin', {
      id: -1,
      name: '操作员',
      username: username,
      password: password
    })
  },
  setLogin: function (username, password) {
    return axios.axiosPost('/login/setLogin', {
      id: -1,
      name: '操作员',
      username: username,
      password: password
    })
  },
  delLogin: function (username) {
    return axios.axiosPost('/login/delLogin', {
      username: username
    })
  },
  getAllLogin: function () {
    return axios.axiosPost('/login/getAllLogin')
  },
  countAllLogin: function () {
    return axios.axiosPost('/login/countAllLogin')
  },
  getLoginByUsername: function (username) {
    return axios.axiosPost('/login/getLoginByUsername', {
      username: username
    })
  },
  getLoginByName: function (username, password) {
    return axios.axiosPost('/login/getLoginByName', {
      name: name
    })
  },
  getLoginById: function (id) {
    return axios.axiosPost('/login/getLoginById', {
      id: id
    })
  }
}
