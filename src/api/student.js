// Student 相关接口
import axios from '@/utils/baseAxios'

export default {
  getStudent: function () {
    return axios.axiosPost('/consumer/showConsumer')
  },
  getStudents: function () {
    return axios.axiosPost('/consumer/showStudents')
  },
  getStudentByName: function (name) {
    return axios.axiosGet('/consumer/getMybatis', {
      name: name
    })
  },
  postStudentByName: function (name) {
    return axios.axiosPost('/consumer/getMybatis', {
      name: name
    })
  },
  postRequestParam: function (name) {
    return axios.axiosPost('/consumer/postRequestParam', {
      name: name
    })
  }
}
