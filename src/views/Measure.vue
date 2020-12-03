<template>
  <div id="measure">
    <div>
      <button @click="insertCurveElement">添加曲线要素</button>
      <button @click="modifyCurveElement">修改曲线要素</button>
      <button @click="deleteCurveElement">删除曲线要素</button>
      <button @click="selectCurveLine">获取曲线信息</button>
      <button @click="selectCurveElement">获取曲线要素</button>
      <button @click="countCurveElement">统计曲线要素</button>
      <button @click="searchCurveElement">查找曲线要素</button>
      <button @click="clearCurveElement">清空曲线要素</button>
    </div>
    <div>
      <button @click="initCurveElement">初始化曲线要素</button>
      <button @click="importExcelCurveElement">导入曲线要素</button>
      <button @click="exportExcelCurveElement">导出曲线要素</button>
      <button @click="calculateCoordinate">计算曲线坐标</button>
    </div>
    <CurveElement caption="曲线要素表" :columns="cols" :rows="rows"/>
  </div>
</template>

<script>
import axios from '@/utils/baseAxios'
import CurveElementApi from '@/api/CurveElement'
import CurveElement from '@/components/CurveElement.vue'

export default {
  name: 'Measure',
  components: {
    CurveElement
  },
  data () {
    return {
      cols: [],
      rows: []
    }
  },
  created () {
    switch (process.env.NODE_ENV) { // 注意变量名是自定义的
      case 'development':
        axios.axiosBaseUrl('/curve-element')
        break
      case 'production':
        axios.axiosBaseUrl(process.env.VUE_APP_REQUEST_URL)
        break
    }

    const _this = this
    _this.cols = [
      { field: 'ceId', title: '序号', width: 60 },
      { field: 'ceJd', title: '交点编号', width: 100 },
      { field: 'ceDk', title: '交点里程', width: 100 },
      { field: 'ceEx', title: '交点坐标', width: 100 },
      { field: 'ceNy', title: '交点坐标', width: 100 },
      { field: 'ceT1', title: '前切线长', width: 100 },
      { field: 'ceT2', title: '后切线长', width: 100 },
      { field: 'ceR1', title: '前缓和曲线半径', width: 100 },
      { field: 'ceR2', title: '后缓和曲线半径', width: 100 },
      { field: 'ceA1', title: '前缓和曲线参数', width: 100 },
      { field: 'ceA2', title: '后缓和曲线参数', width: 100 },
      { field: 'ceLs1', title: '前缓和曲线长', width: 100 },
      { field: 'ceLs2', title: '后缓和曲线长', width: 100 },
      { field: 'ceRc', title: '圆曲线半径', width: 100 },
      { field: 'ceLc', title: '圆曲线长', width: 100 },
      { field: 'ceE', title: '外失距', width: 100 },
      { field: 'ceLz', title: '夹直线长', width: 100 },
      { field: 'cePj', title: '偏角', width: 100 },
      { field: 'ceFwj', title: '方位角', width: 100 },
      { field: 'ceQd', title: '起点里程', width: 100 },
      { field: 'ceZh', title: '直缓里程', width: 100 },
      { field: 'ceHy', title: '缓圆里程', width: 100 },
      { field: 'ceYh', title: '圆缓里程', width: 100 },
      { field: 'ceHz', title: '缓直里程', width: 100 },
      { field: 'ceZd', title: '终点里程', width: 100 }]

    CurveElementApi.selectCurveElement()
      .then(res => {
        for (var i = 0; i < res.data.count; i++) {
          var item = res.data.data[i]
          var items = [
            {
              field: 'ceJd',
              value: item.ceJd
            },
            {
              field: 'ceDk',
              value: item.ceDk
            },
            {
              field: 'ceEx',
              value: item.ceEx
            },
            {
              field: 'ceNy',
              value: item.ceNy
            },
            {
              field: 'ceT1',
              value: item.ceT1
            },
            {
              field: 'ceT2',
              value: item.ceT2
            },
            {
              field: 'ceR1',
              value: item.ceR1
            },
            {
              field: 'ceR2',
              value: item.ceR2
            },
            {
              field: 'ceA1',
              value: item.ceA1
            },
            {
              field: 'ceA2',
              value: item.ceA2
            },
            {
              field: 'ceLs1',
              value: item.ceLs1
            },
            {
              field: 'ceLs2',
              value: item.ceLs2
            },
            {
              field: 'ceRc',
              value: item.ceRc
            },
            {
              field: 'ceLc',
              value: item.ceLc
            },
            {
              field: 'ceE',
              value: item.ceE
            },
            {
              field: 'ceLz',
              value: item.ceLz
            },
            {
              field: 'cePj',
              value: item.cePj
            },
            {
              field: 'ceFwj',
              value: item.ceFwj
            },
            {
              field: 'ceQd',
              value: item.ceQd
            },
            {
              field: 'ceZh',
              value: item.ceZh
            },
            {
              field: 'ceHy',
              value: item.ceHy
            },
            {
              field: 'ceYh',
              value: item.ceYh
            },
            {
              field: 'ceHz',
              value: item.ceHz
            },
            {
              field: 'ceZd',
              value: item.ceZd
            }]
          _this.rows.push({
            id: i + 1,
            items: items
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    insertCurveElement: function () {
      CurveElementApi.insertCurveElement({})
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    modifyCurveElement: function () {
      CurveElementApi.modifyCurveElement({})
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteCurveElement: function () {
      CurveElementApi.deleteCurveElement('', '')
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectCurveLine: function () {
      CurveElementApi.selectCurveLine()
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectCurveElement: function () {
      CurveElementApi.selectCurveElement()
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    countCurveElement: function () {
      CurveElementApi.countCurveElement()
        .then(res => {
          alert(res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchCurveElement: function () {
      CurveElementApi.searchCurveElement('ce_JD', 'JD22', 1, 10)
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    clearCurveElement: function () {
      CurveElementApi.clearCurveElement()
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    initCurveElement: function () {
      CurveElementApi.initCurveElement('', 0, 0)
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    importExcelCurveElement: function () {
      CurveElementApi.importExcelCurveElement('')
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    exportExcelCurveElement: function () {
      CurveElementApi.exportExcelCurveElement()
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    },
    calculateCoordinate: function () {
      CurveElementApi.calculateCoordinate(0, '',
        0, 0, 0, 0,
        0, 0, 0,
        0, 0, 0)
        .then(res => {
          alert(res.data.code)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus">
  #measure {
    margin-top: 30px;
  }

  button {
    margin-left: 5px;
  }
  div {
    margin-top: 5px;
  }
</style>
