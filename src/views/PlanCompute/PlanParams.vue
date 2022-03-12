<template>
  <div class="flex-container-body">
    <div class="flex-body-table">
      <div class="flex-table-title">
        <div class="flex-title-left">
          <span class="text-title-20">网络计划参数</span>
        </div>
        <div class="flex-title-center">
          <span class="text-content-16">earliestStart: {value:44389.0, date:'2021-07-12 00:00:00', format:'yyyy-MM-dd HH:mm:ss', year:2021, month:7, day:12, hour:0, minute:0, second:0}</span>
          <span class="text-content-16">netPlanItems: the 283 works and work level are divided into five levels</span>
        </div>
      </div>
      <div class="flex-table-content">
        <page-table
          ref="table"
          :checkbox="false"
          :cols="cols"
          :rows="rows"
          :refresh="refresh"
          :page="page"
          :toolbar="{show:{search: true}}"
          :filters="filters"
          @handleSize="handleSize"
          @handlePage="handlePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LoginApi from '@/api/login'
import PageTable from '@/components/PageTable/PageTable'

export default {
  name: 'PlanParams',
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
        width: 150,
        align: 'center'
      },
      {
        id: 2,
        prop: 'rootid',
        label: '工作父ID',
        sort: true,
        width: 150,
        align: 'center'
      },
      {
        id: 3,
        prop: 'level',
        label: '工作层级',
        sort: true,
        width: 150,
        align: 'center'
      },
      {
        id: 4,
        prop: 'work',
        label: '工作名称',
        width: 250,
        align: 'center'
      },
      {
        id: 5,
        prop: 'frontids',
        label: '紧前工作',
        width: 200,
        align: 'center'
      },
      {
        id: 6,
        prop: '_DP',
        label: '时间间隔',
        width: 150,
        align: 'center'
      },
      {
        id: 7,
        prop: 'info',
        label: '备注',
        width: 770,
        align: 'center'
      }
    ]

    this.page = { show: true, total: 0, sizes: [50, 100, 200, 500], size: 50, cur: 1, layout: 'total, sizes, prev, pager, next, jumper' }
    this.filters = [{ prop: 'level' }, { prop: 'work' }]

    const earliestStart = { value: 44389.0, date: '2021-07-12 00:00:00', format: 'yyyy-MM-dd HH:mm:ss', year: 2021, month: 7, day: 12, hour: 0, minute: 0, second: 0 }
    this.getData(earliestStart)
  },
  methods: {
    getData (earliestStart) {
      LoginApi.planParams(earliestStart).then(res => {
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
  .el-table-column >>> .el-table {
    td:not(.is-hidden):last-child {
      right: -1px;
    }
  }
</style>
