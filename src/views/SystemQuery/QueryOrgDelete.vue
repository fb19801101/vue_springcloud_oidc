<template>
  <div class="flex-container-body">
    <div class="flex-aside-tree">
      <div class="flex-tree-title">
        <span class="text-title-20">授权节点范围</span>
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
import LoginApi from '@/api/login'
import PageTable from '@components/PageTable/PageTable'
import PageTree from '@/components/PageTree/PageTree'

export default {
  name: 'QueryOrgDelete',
  components: { PageTable, PageTree },
  data () {
    return {
      cols: [],
      rows: [],
      page: {},
      search: {},
      refresh: '',
      filters: [],
      imgShow: true,

      tableData: [],

      lazyData: {
        refresh: 1,
        refreshLevel: 0,
        nodeKey: 'key',
        baseData: [], // 树的基础数据，从组件中获取到
        lazyInfo: [
          {
            key: 'id', // 节点唯一标识字段
            label: 'name', // 节点显示字段
            type: 3, // 数据类型
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
            type: 3,
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
        prop: 'id',
        label: '序号',
        sort: true,
        width: 100,
        align: 'center'
      },
      {
        id: 2,
        prop: 'nodePath',
        label: '组织路径',
        width: 400
      },
      {
        id: 3,
        prop: 'content',
        label: '详细信息'
      },
      {
        id: 4,
        prop: 'createTime',
        label: '组织删除时间',
        width: 200,
        align: 'center'
      }
    ]

    this.page = { show: true, total: 0, sizes: [20, 50, 100, 200], size: 20, cur: 1, layout: 'total, sizes, prev, pager, next, jumper'}
    this.filters = [{ prop: 'content' }, { prop: 'nodePath' }, { prop: 'createTime' }]

    this.refreshTable(this.global.nodeProvider, this.global.nodeCode)
  },
  methods: {
    lazyApiRoot () {
      return LoginApi.currentAuthRootNode(this.global.providerId, this.global.userId)
    },
    lazyApiChildren (param) {
      return LoginApi.getOrganizationChildrenFilter(param.provider, param.id, param.type, this.lazyData.lazyInfo[1].type)
    },
    // 触发事件
    handleEvent (event, node) {
      if (event === 'leftClick') {
        this.imgShow = false;
        this.refreshTable(node.data.provider, node.data.code)
      }
    },
    // 获取表单数据
    refreshTable (provider, code) {
      LoginApi.authOrgDelete(this.global.providerId, this.global.userId, true).then(res => {
        if (res.data.code === 200) {
          LoginApi.queryOrgByNodeCode(provider, code).then(res => {
            if (res.data.code === 200) {
              this.tableData = []
              let index = 1
              for (const i in res.data.data) {
                const item = {}
                item.id = index++
                item.nodePath = res.data.data[i].nodePath
                item.content = res.data.data[i].content
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
        }
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
  .el-table-column >>> .el-table {
    td:not(.is-hidden):last-child {
      right: -1px;
    }
  }
</style>
