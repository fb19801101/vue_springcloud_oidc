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
          @handleRow="handleRow"
        />
      </div>

      <method-auth :authData.sync="authMethod"/>

      <div class="flex-image-content" v-show="imgShow">
        <el-image :src="require('@assets/page.png')"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import PageTree from '@/components/PageTree/PageTree'
import PageTable from '@components/PageTable/PageTable'
import MethodAuth from '@components/AuthDialog/MethodAuth'
import LoginApi from '@/api/login'

export default {
  name: 'QueryAuth',
  components: { PageTree, PageTable, MethodAuth },
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
      orgPath: '',

      authMethod: { title: '查询用户权限', objName: '', objProvider: '', objId: 0, tableData: [], dialogMethodVisible: false },

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
        width: 80,
        align: 'center'
      },
      {
        id: 2,
        prop: 'objName',
        label: '授权对象',
        width: 150,
        align: 'center'
      },
      {
        id: 3,
        prop: 'objType',
        label: '授权类型',
        width: 100,
        align: 'center'
      },
      {
        id: 4,
        prop: 'objPath',
        label: '授权对象路径'
      },
      {
        id: 5,
        prop: 'nodePath',
        label: '授权范围'
      },
      {
        id: 6,
        prop: 'createTime',
        label: '授权时间',
        width: 200,
        align: 'center'
      },
      {
        id: 7,
        label: '操作',
        slot: [{
          type: 'getAuth',
          name: '查看'
        }],
        width: 120,
        align: 'center'
      }
    ]

    this.page = { show: true, total: 0, sizes: [20, 50, 100, 200], size: 20, cur: 1, layout: 'total, sizes, prev, pager, next, jumper' }
    this.filters = [{ prop: 'objName' }, { prop: 'objType' }, { prop: 'objPath' }, { prop: 'nodePath' }, { prop: 'createTime' }]

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
        this.imgShow = false
        this.getOrgPath(node.data.provider, node.data.id, 1)
        this.refreshTable(node.data.provider, node.data.code)
      }
    },
    // 获取表单数据
    refreshTable (provider, code) {
      LoginApi.authLogin(this.global.providerId, this.global.userId, true).then(res => {
        if (res.data.code === 200) {
          LoginApi.queryAuthByCode(provider, code).then(res => {
            if (res.data.code === 200) {
              this.tableData = []
              let index = 1
              for (const i in res.data.data) {
                const item = {}
                item.id = index++

                item.providerId = res.data.data[i].providerId
                item.operatorId = res.data.data[i].operatorId

                item.objProvider = res.data.data[i].objProvider
                item.objId = res.data.data[i].objId
                item.objName = res.data.data[i].objName
                item.objType = res.data.data[i].objType === 0 ? '人员' : '岗位'
                item.objPath = res.data.data[i].objPath
                item.createTime = res.data.data[i].createTime.substring(0, 19)
                item.nodePath = res.data.data[i].nodePath

                item.authOrg = res.data.data[i].authOrg
                item.authOpAuth = res.data.data[i].authOpAuth
                item.authQueryAuth = res.data.data[i].authQueryAuth
                item.authLog = res.data.data[i].authLog
                item.authPostChange = res.data.data[i].authPostChange
                item.authPostDelete = res.data.data[i].authPostDelete

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
    showMethodAuth (row) {
      this.authMethod.objProvider = row.objProvider
      this.authMethod.objId = row.objId
      this.authMethod.objName = row.objName

      LoginApi.queryMenuAuth(row.providerId, row.operatorId, row.objProvider, row.objId).then(res => {
        if (res.data.code === 200) {
          this.authMethod.tableData = res.data.data
          for (var i in this.authMethod.tableData) {
            this.authMethod.tableData[i]._manage = true
            this.authMethod.tableData[i]._scan = true
          }
          this.authMethod.dialogMethodVisible = true
        } else {
          this.authMethod.tableData = []
          this.authMethod.dialogMethodVisible = false
        }
      })
    },
    handleRow (row, type) {
      if (type === 'getAuth') {
        this.showMethodAuth(row)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
