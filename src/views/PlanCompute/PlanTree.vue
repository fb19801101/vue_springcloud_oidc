<template>
  <div class="flex-container-body">
    <div class="flex-body-table">
      <div class="flex-table-title">
        <div class="flex-title-left">
          <span class="text-title-20">动态计划树状结构</span>
        </div>
        <div class="flex-title-right">
          <el-button @click="exportPlan" type="primary" plain>导出计划</el-button>
          <el-button @click="expandPlan" type="primary" plain>全部展开</el-button>
          <el-button @click="foldPlan" type="primary" plain>全部折叠</el-button>
        </div>
      </div>
      <div class="flex-table-content">
        <page-table
          ref="table"
          :checkbox="false"
          :cols="cols"
          :rows="rows"
          :btree="true"
          :folder="folder"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LoginApi from '@/api/login'
import PageTable from '@/components/PageTable/PageTable'

export default {
  name: 'PlanTree',
  components: { PageTable },
  data () {
    return {
      cols: [],
      rows: [],
      folder: true
    }
  },
  created () {
    this.cols = [
      {
        id: 1,
        prop: 'id',
        label: '工作ID',
        sort: true,
        width: 120,
        align: 'center'
      },
      {
        id: 2,
        prop: 'rootid',
        label: '工作父ID',
        sort: true,
        width: 100
      },
      {
        id: 3,
        prop: 'level',
        label: '工作层级',
        sort: true,
        width: 100
      },
      {
        id: 4,
        prop: 'work',
        label: '工作名称',
        width: 150,
        align: 'center'
      },
      {
        id: 5,
        prop: 'frontids',
        label: '紧前工作',
        width: 100,
        align: 'center'
      },
      {
        id: 6,
        prop: 'backids',
        label: '紧后工作',
        width: 100,
        align: 'center'
      },
      {
        id: 7,
        prop: '_DP',
        label: '工作工期',
        width: 80,
        align: 'center'
      },
      {
        id: 8,
        prop: 'key',
        label: '关键工作',
        width: 80,
        align: 'center'
      },
      {
        id: 9,
        prop: '_TF',
        label: '总时差',
        width: 80,
        align: 'center'
      },
      {
        id: 10,
        prop: '_FF',
        label: '自由时差',
        width: 80,
        align: 'center'
      },
      {
        id: 11,
        prop: '_TL',
        label: '时间间隔',
        width: 80,
        align: 'center'
      },
      {
        id: 12,
        prop: '_PB',
        label: '计划开始时间',
        width: 150,
        align: 'center'
      },
      {
        id: 13,
        prop: '_PE',
        label: '计划结束时间',
        width: 150,
        align: 'center'
      },
      {
        id: 14,
        prop: '_PG',
        label: '计划工期',
        width: 80,
        align: 'center'
      },
      {
        id: 15,
        prop: '_EB',
        label: '预计开始时间',
        width: 150,
        align: 'center'
      },
      {
        id: 16,
        prop: '_EE',
        label: '预计结束时间',
        width: 150,
        align: 'center'
      },
      {
        id: 17,
        prop: '_EG',
        label: '预计工期',
        width: 80,
        align: 'center'
      },
      {
        id: 18,
        prop: '_AB',
        label: '实际开始时间',
        width: 150,
        align: 'center'
      },
      {
        id: 19,
        prop: '_AE',
        label: '实际结束时间',
        width: 150,
        align: 'center'
      },
      {
        id: 20,
        prop: '_AG',
        label: '实际工期',
        width: 80,
        align: 'center'
      },
      {
        id: 21,
        prop: 'sf',
        label: '完成状态',
        width: 80,
        align: 'center'
      },
      {
        id: 22,
        prop: 'sk',
        label: '分级预警',
        width: 80,
        align: 'center'
      },
      {
        id: 23,
        prop: 'sw',
        label: '进度预警',
        width: 80,
        align: 'center'
      },
      {
        id: 24,
        prop: 'milepost',
        label: '里程碑',
        width: 80,
        align: 'center'
      }
    ]

    this.getData()
  },
  methods: {
    getData () {
      LoginApi.planStatic().then(res => {
        if (res.data.code === 200) {
          LoginApi.planTree().then(res => {
            if (res.data.code === 200) {
              this.rows = res.data.data
            } else {
              this.rows = []
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.rows = []
        }
      }).catch(err => {
        console.log(err)
      })
    },
    exportPlan () {
      LoginApi.planExport('D:/items_vue.csv').then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: '网络计划导出成功！',
            type: 'success',
            duration: 1000
          })
        } else {
          this.$message({
            message: '网络计划导出失败！',
            type: 'warning',
            duration: 1000
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    expandPlan () {
      this.folder = false
      this.getData()
    },
    foldPlan () {
      this.folder = true
      this.getData()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-table-column >>> .el-table {
    td:not(.is-hidden):last-child {
      right: -1px;
    }
  }
</style>
