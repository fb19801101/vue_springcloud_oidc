<template>
  <div class="flex-container-body">
    <div class="flex-aside-tree">
      <div class="flex-tree-title">
        <span class="text-title-20">组织节点范围</span>
      </div>
      <div class="flex-tree-content">
        <page-tree
          :checkbox="false"
          :base-data.sync="lazyData.baseData"
          :node-key="lazyData.nodeKey"
          :load-type="2"
          :lazy-info="lazyData.lazyInfo"
          :tree-refresh="lazyData.refresh"
          :refresh-level="lazyData.refreshLevel"
          @handleEvent="handleEvent"
        />
      </div>
    </div>

    <div class="flex-body-table">
      <div class="flex-table-title" v-show="!imgShow">
        <span class="text-content-18">{{ orgPath }}</span>
      </div>
      <div class="flex-table-content" v-show="!imgShow">
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

      <div class="flex-image-content" v-show="imgShow">
        <el-image :src="require('@assets/page.png')"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import PageTree from '@/components/PageTree/PageTree'
import PageTable from '@/components/PageTable/PageTable'
import Item from './Item'
import LoginApi from '@/api/login'

export default {
  name: 'BrowserWeb',
  components: { PageTree, PageTable },
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
      items: [],

      orgPath: '',

      lazyData: {
        refresh: 1,
        // refreshLevel: this.global.nodeProvider ===this.global.crccNodeProvider ? 0 : 1,
        refreshLevel: 0,
        nodeKey: 'key',
        // baseData: [{provider: this.global.crccNodeProvider, id: this.global.crccNodeId, name: this.global.crccNodeName}], // 树的基础数据，从组件中获取到
        baseData: [],
        lazyInfo: [
          {
            key: 'id', // 节点唯一标识字段
            label: 'name', // 节点显示字段
            type: 3, // 数据类型 单位
            api: this.lazyApiRoot, // 获取数据的接口
            params: {
              key: 'id',
              value: null,
              type: 'url'
            }, // 获取数据的参数
            resFieldList: ['data', 'data'], // 数据所在字段
            leaf: true
          },
          {
            key: 'id',
            label: 'name',
            type: 3, // 数据类型 单位 部门
            api: this.lazyApiChildren,
            params: {
              key: 'id',
              value: null,
              data: [{ key: 'provider', value: null }, { key: 'id', value: null }, { key: 'type', value: null }],
              type: 'query'
            },
            resFieldList: ['data', 'data'], // 数据所在字段
            leaf: true
          }
        ]
      }
    }
  },
  created () {
    this.cols = [
      {
        id: 1,
        prop: 'index',
        label: '序号',
        sort: true,
        width: 150,
        align: 'center'
      },
      {
        id: 2,
        prop: 'name',
        label: '姓名',
        width: 200,
        align: 'center'
      },
      {
        id: 3,
        prop: 'genderName',
        label: '性别',
        width: 150,
        align: 'center'
      },
      {
        id: 4,
        prop: 'companyName',
        label: '单位',
        align: 'center'
      },
      {
        id: 5,
        prop: 'departmentName',
        label: '部门',
        align: 'center'
      },
      {
        id: 6,
        prop: 'positionName',
        label: '岗位',
        width: 200,
        align: 'center'
      }
    ]

    this.page = { show: true, total: 0, sizes: [50, 100, 200, 500, 1000, 2000], size: 50, cur: 1, layout: 'total, sizes, prev, pager, next, jumper', slot: '【已加载 1 页 1000 条, 点击下一页显示更多】' }

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

    lazyApiRoot () {
      return LoginApi.currentAuthRootNode(this.global.providerId, this.global.userId)
    },
    lazyApiChildren (param) {
      return LoginApi.getOrganizationChildrenFilter(param.provider, param.id, param.type, this.lazyData.lazyInfo[1].type)
    },
    // 触发事件
    handleEvent (event, node) {
      if (event === 'leftClick') {
        this.imgShow = false
        this.rows = []
        this.page.cur = 1
        this.page.total = 0

        this.refresh = Date.now().toString(36)

        // eslint-disable-next-line camelcase
        const t_begin = new Date()
        console.log('click node begin: ' + t_begin.toLocaleTimeString('chinese', { hour12: false }) + ':' + t_begin.getMilliseconds())

        this.initOrgUsers(node.data.provider, node.data.id, node.data.type)

        // eslint-disable-next-line camelcase
        const t_end = new Date()
        console.log('click node end: ' + t_end.toLocaleTimeString('chinese', { hour12: false }) + ':' + t_end.getMilliseconds())
      }
    },
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
