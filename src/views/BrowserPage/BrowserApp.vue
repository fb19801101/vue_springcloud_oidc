<template>
  <div class="flex-container-mobile">
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
</template>

<script>
import PageTable from '@/components/PageTable/PageTable'
import Item from './Item'
import LoginApi from '@/api/login'

export default {
  name: 'BrowserApp',
  components: { PageTable },
  data () {
    return {
      cols: [],
      rows: [],
      page: {},
      search: {},
      refresh: '',
      filters: [],
      imgShow: true,

      itemComponent: Item,
      items: []
    }
  },
  created () {
    this.cols = [
      {
        id: 1,
        prop: 'index',
        label: '序号',
        width: 80,
        align: 'center'
      },
      {
        id: 2,
        label: '图标',
        slot: [{
          type: 'image',
          name: require('@assets/user.png')
        }],
        width: 80,
        align: 'center'
      },
      {
        id: 3,
        prop: 'name',
        label: '姓名',
        width: 150,
        align: 'center'
      },
      {
        id: 4,
        prop: 'genderName',
        label: '性别',
        width: 80,
        align: 'center'
      },
      {
        id: 5,
        prop: 'info',
        label: '岗位',
        align: 'left'
      }
    ]

    this.page = { show: true, total: 0, size: 200, cur: 1, layout: 'total, prev, pager, next' }

    this.filters = [{ prop: 'id' }, { prop: 'name' }, { prop: 'gender' }, { prop: 'company' }, { prop: 'department' }, { prop: 'position' }]

    this.initOrgUsers(this.global.nodeProvider, this.global.nodeId, this.global.nodeType)

    this.dataSource()
  },
  methods: {
    item (index) {
      const item = []
      for (let i = 1; i <= 100; i++) {
        item.push({
          index: (index - 1) * 100 + i,
          name: 'name',
          genderName: '男',
          companyName: 'company',
          departmentName: 'department',
          positionName: 'position'
        })
      }

      return item
    },
    dataSource () {
      for (let i = 1; i <= 1000; i++) {
        this.items.push({
          id: i,
          items: this.item(i)
        })
      }
    },
    // 触发事件
    initOrgUsers (providerId, orgId, orgType) {
      if (providerId === this.global.nodeProvider && orgId === this.global.nodeId) {
        LoginApi.InitOrganizationAndUsers(this.global.providerId, this.global.userId, providerId, orgId, orgType).then(res => {
          if (res.data.code === 200) {
            this.getOrgUsers()
            this.getOrgPath(providerId, orgId, 1)
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        LoginApi.getUserList(this.global.providerId, this.global.userId, providerId, orgId).then(res => {
          if (res.data.code === 200) {
            this.getOrgUsers()
            this.getOrgPath(providerId, orgId, 1)

            // eslint-disable-next-line camelcase
            const t_end = new Date()
            console.log('click node end: ' + t_end.toLocaleTimeString('chinese', { hour12: false }) + ':' + t_end.getMilliseconds())
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 获取表单数据
    getOrgUsers () {
      LoginApi.getUsersCount().then(res => {
        if (res.data.code === 200) {
          this.rows = []
          this.page.cur = 1
          this.page.total = res.data.data

          LoginApi.getUsersWithOffsetAndLimit((this.page.cur - 1) * this.page.size, this.page.size).then(res => {
            if (res.data.code === 200) {
              this.rows = res.data.data
              this.rows.forEach((item) => {
                item.info = item.companyName + '/' + item.departmentName + '/' + item.positionName
              })

              this.refresh = Date.now().toString(36)
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.rows = []
          this.page.cur = 1
          this.page.total = 0
          this.refresh = Date.now().toString(36)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取指定节点的路径数组
    getOrgPath (providerId, orgId, level) {
      LoginApi.getOrganizationPath(providerId, orgId, level, false).then(res => {
        if (res.data.code === 200) {
          this.orgPath = (res.data.data)
        } else {
          this.orgPath.empty()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 每页表单数量选择函数
    handleSize (val) {
      this.page.size = val

      this.rows = []
      this.page.cur = 1
      this.refresh = Date.now().toString(36)

      LoginApi.getUsersWithOffsetAndLimit((this.page.cur - 1) * this.page.size, this.page.size).then(res => {
        if (res.data.code === 200) {
          this.rows = res.data.data
          this.refresh = Date.now().toString(36)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 选页函数
    handlePage (val) {
      this.page.cur = val

      this.rows = []
      this.refresh = Date.now().toString(36)

      LoginApi.getUsersWithOffsetAndLimit((this.page.cur - 1) * this.page.size, this.page.size).then(res => {
        if (res.data.code === 200) {
          this.rows = res.data.data
          this.refresh = Date.now().toString(36)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
