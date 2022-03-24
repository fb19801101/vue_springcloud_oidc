<template>
  <div class="flex-container-table">
    <div class="flex-table-title">
      <div class="flex-title-left">
        <span class="text-title-20">静态网络计划</span>
      </div>
      <div class="flex-title-center">
        <span class="text-content-16">earliestStart: {value:44389.0, date:'2021-07-12 00:00:00', format:'yyyy-MM-dd HH:mm:ss', year:2021, month:7, day:12, hour:0, minute:0, second:0}</span>
        <span class="text-content-16">netPlanItems: '/demo/planComputeParams'</span>
      </div>
    </div>
    <div class="flex-table-content">
      <page-table
        ref="table"
        :checkbox="false"
        :cols="cols"
        :rows="rows"
        :btree="false"
        :refresh="refresh"
        :page="page"
        :toolbar="{show:{search: true}}"
        :filters="filters"
        @handleSize="handleSize"
        @handlePage="handlePage"
      />
    </div>
  </div>
</template>

<script>
import LoginApi from '@/api/login'
import PageTable from '@/components/PageTable/PageTable'

export default {
  name: 'PlanStatic',
  components: { PageTable },
  data () {
    return {
      cols: [],
      rows: [],
      page: {},
      search: {},
      refresh: '',
      filters: [],
      tableData: []
    }
  },
  created () {
    this.cols = [
      {
        id: 1,
        prop: 'id',
        label: '工作ID',
        sort: true,
        width: 80,
        align: 'center'
      },
      {
        id: 2,
        prop: 'rootid',
        label: '工作父ID',
        sort: true,
        width: 80,
        align: 'center'
      },
      {
        id: 3,
        prop: 'level',
        label: '工作层级',
        sort: true,
        width: 80,
        align: 'center'
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
        width: 80,
        align: 'center'
      },
      {
        id: 6,
        prop: 'backids',
        label: '紧后工作',
        width: 80,
        align: 'center'
      },
      {
        id: 7,
        prop: '_DP',
        label: '工作工期',
        width: 60,
        align: 'center'
      },
      {
        id: 8,
        prop: 'key',
        label: '关键工作',
        width: 60,
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
        width: 50,
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
        width: 60,
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
        width: 50,
        align: 'center'
      },
      {
        id: 22,
        prop: 'sk',
        label: '分级预警',
        width: 50,
        align: 'center'
      },
      {
        id: 23,
        prop: 'sw',
        label: '进度预警',
        width: 50,
        align: 'center'
      },
      {
        id: 24,
        prop: 'milepost',
        label: '里程碑',
        width: 60,
        align: 'center'
      }
    ]

    this.page = { show: 1, total: 0, sizes: [50, 100, 200, 500], size: 50, cur: 1, layout: 'total, sizes, prev, pager, next, jumper' }
    this.filters = [{ prop: 'level' }, { prop: 'work' }]
    this.getData()
  },
  methods: {
    getData () {
      LoginApi.planStatic().then(res => {
        if (res.data.code === 200) {
          this.refreshPlan()
        } else {
          this.tableData = []
          this.page.total = 0
          this.rows = this.tableData.slice(0, this.page.size)
        }

        this.refresh = Date.now().toString(36)
      }).catch(err => {
        console.log(err)
      })
    },
    // 每页表单数量选择函数
    handleSize (val) {
      this.refresh = Date.now().toString(36)
      this.page.size = val
      this.rows = this.tableData.slice((this.page.cur - 1) * this.page.size, this.page.cur * this.page.size)
    },
    // 选页函数
    handlePage (val) {
      this.refresh = Date.now().toString(36)
      this.page.cur = val
      this.rows = this.tableData.slice((this.page.cur - 1) * this.page.size, this.page.cur * this.page.size)
    },
    refreshPlan () {
      LoginApi.planList().then(res => {
        if (res.data.code === 200) {
          this.tableData = res.data.data
          this.page.total = res.data.count
          this.rows = this.tableData.slice((this.page.cur - 1) * this.page.size, this.page.cur * this.page.size)
        } else {
          this.tableData = []
          this.page.total = 0
          this.rows = this.tableData.slice(0, this.page.size)
        }

        this.refresh = Date.now().toString(36)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
