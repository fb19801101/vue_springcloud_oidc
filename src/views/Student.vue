<template>
  <div id="student">
    <button @click="getStudent">get参数</button>
    <button @click="postStudent">Post参数</button>
    <input type="text" v-model="student"/>
    <table>
      <caption>
        <h3>学生信息表</h3>
      </caption>

      <thead>
        <tr>
          <th width="200">姓名</th>
          <th width="100">年龄</th>
          <th width="200">电话</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.name" >
          <td>{{item.name}}</td>
          <td>{{item.age}}</td>
          <td>17791540396</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/utils/baseAxios'
import studentApi from '@/api/student'

export default {
  name: 'Student',
  data () {
    return {
      items: [
        // { name: '王五', age: 10 },
        // { name: '张三', age: 20 },
        // { name: '李四', age: 30 }
      ],
      student: '李连杰'
    }
  },
  created () {
    switch (process.env.NODE_ENV) { // 注意变量名是自定义的
      case 'development':
        axios.axiosBaseUrl('/consumer')
        break
      case 'production':
        axios.axiosBaseUrl('http://localhost:8085')
        break
    }

    const _this = this
    studentApi.getStudents()
      .then(res => {
        _this.items = res.data
        _this.items.push({ name: '甄子丹', age: 40 })
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    getStudent: function () {
      const _this = this
      studentApi.getStudentByName(_this.student)
        .then(res => {
          _this.items.push(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    postStudent: function () {
      const _this = this
      studentApi.postRequestParam(_this.student)
        .then(res => {
          _this.items = []
          _this.items.push(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus">
  #student {
    margin-top: 30px;
  }
  table {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
  }
  table td, table th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
  }
  table thead th {
    background-color: #CCE8EB;
    width: 100px;
  }
  table tr:nth-child(odd) {
    background: #fff;
  }
  table tr:nth-child(even) {
    background: #F5FAFA;
  }

  input {
    width: 100px;
    margin-left: 5px;
  }
</style>
