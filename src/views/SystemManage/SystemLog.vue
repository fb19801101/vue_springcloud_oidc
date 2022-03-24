<template>
  <div class="flex-container-body">
    <div class="flex-body-table">
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
  name: 'SystemLog',
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
        label: '序号',
        sort: true,
        width: 100,
        align: 'center'
      },
      {
        id: 2,
        prop: 'content',
        label: '日志内容'
      },
      {
        id: 3,
        prop: 'userPath',
        label: '操作人单位',
        width: 380
      },
      {
        id: 4,
        prop: 'userName',
        label: '操作人',
        width: 150,
        align: 'center'
      },
      {
        id: 5,
        prop: 'createTime',
        label: '操作时间',
        width: 200,
        align: 'center'
      }
    ]

    this.page = { show: 1, total: 0, sizes: [20, 50, 100, 200], size: 20, cur: 1, layout: 'total, sizes, prev, pager, next, jumper' }
    this.filters = [{ prop: 'content' }, { prop: 'userPath' }, { prop: 'userName' }, { prop: 'createTime' }]
    this.getData()
  },
  methods: {
    getData () {
      LoginApi.queryLogByNodeCode(this.global.nodeProvider, this.global.nodeCode).then(res => {
        if (res.data.code === 200) {
          this.tableData = []
          let index = 1
          for (const i in res.data.data) {
            const item = {}
            item.id = index++
            item.content = res.data.data[i].content
            item.userPath = res.data.data[i].userPath
            item.userName = res.data.data[i].userName
            item.createTime = res.data.data[i].createTime.substring(0, 19)

            this.tableData.push(item)
          }

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
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
