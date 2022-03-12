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
      <div class="flex-table-title">
        <div class="flex-title-left" v-show="!imgShow">
          <span class="text-content-18">{{ orgPath }}</span>
        </div>
        <div class="flex-title-right" v-show="!imgShow && showAuthDialog">
          <el-button @click="delCheckedAuth" :disabled="selectRows.length === 0" type="danger" plain>批量删除</el-button>
          <post-auth :clickNode="clickNode" @refreshTable="refreshTable" />
          <people-auth :clickNode="clickNode" @refreshTable="refreshTable" />
        </div>
      </div>
      <div class="flex-table-content" v-show="!imgShow">
        <page-table
          ref="table"
          :checkbox="true"
          :cols="cols"
          :rows="rows"
          :refresh="refresh"
          :page="page"
          :toolbar="{show:{search: true}}"
          :filters="filters"
          @handleSize="handleSize"
          @handlePage="handlePage"
          @handleRow="handleRow"
          @selectCheckbox="selectCheckbox"
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
import PageTable from '@/components/PageTable/PageTable'
import PeopleAuth from '@components/AuthDialog/PeopleAuth'
import PostAuth from '@components/AuthDialog/PostAuth'
import MethodAuth from '@components/AuthDialog/MethodAuth'
import LoginApi from '@/api/login'

export default {
  name: 'SystemAuth',
  components: { PageTree, PageTable, PeopleAuth, PostAuth, MethodAuth },
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

      authMethod: { title: '编辑用户权限', objName: '', objProvider: '', objId: 0, tableData: [], dialogMethodVisible: false },

      // 表格多选框选择的数据
      selectRows: [],
      clickNode: {},
      showAuthDialog: this.$store.state.userAuthManage === 2,

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
        prop: 'objName',
        label: '授权对象',
        width: 200,
        align: 'center'
      },
      {
        id: 3,
        prop: 'objType',
        label: '授权类型',
        width: 150,
        align: 'center'
      },
      {
        id: 4,
        prop: 'objPath',
        label: '对象组织路径'
      },
      {
        id: 5,
        label: '操作',
        slot: [{
          type: 'setAuth',
          name: '授权功能',
          disabled: this.$store.state.userAuthManage !== 2
        }, {
          type: 'delAuth',
          name: '删除',
          disabled: this.$store.state.userAuthManage !== 2
        }],
        width: 200,
        align: 'center'
      }
    ]


    this.page = { show: true, total: 0, sizes: [20, 50, 100, 200], size: 20, cur: 1, layout: 'total, sizes, prev, pager, next, jumper'}
    this.filters = [{ prop: 'id' }, { prop: 'objName' }, { prop: 'objType' }, { prop: 'objPath' }]

    this.clickNode.provider = this.global.nodeProvider
    this.clickNode.id = this.global.nodeId
    this.refreshTable(this.global.nodeProvider, this.global.nodeId)
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
        this.getOrgPath(node.data.provider, node.data.id, 1)
        this.refreshTable(node.data.provider, node.data.id)
        this.clickNode = node.data
      }
    },
    // 获取表单数据
    refreshTable (providerId, orgId) {
      LoginApi.authLogin(this.global.providerId, this.global.userId, true).then(res => {
        if (res.data.code === 200) {
          LoginApi.queryAuthByNode(providerId, orgId).then(res => {
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

                item.authOrg = res.data.data[i].authOrg
                item.authOpAuth = res.data.data[i].authOpAuth
                item.authQueryAuth = res.data.data[i].authQueryAuth
                item.authLog = res.data.data[i].authLog
                item.authPostChange = res.data.data[i].authPostChange
                item.authPostDelete = res.data.data[i].authPostDelete

                this.tableData.push(item)
                this.page.total = res.data.count
                this.rows = this.tableData.slice((this.page.cur - 1) * this.page.size, this.page.cur * this.page.size)
              }
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
      if (this.global.objId === row.objId || this.global.objPostId === row.objId) {
        this.$message({
          message: '自身授权不能更改！',
          type: 'warning',
          duration: 500
        })
      } else {
        if (row.objId === this.global.crccAdminId) {
          this.$message({
            message: '管理员授权不能更改！',
            type: 'warning',
            duration: 500
          })
        } else {
          this.authMethod.objProvider = row.objProvider
          this.authMethod.objId = row.objId
          this.authMethod.objName = row.objName

          LoginApi.queryMenuAuth(row.providerId, row.operatorId, row.objProvider, row.objId).then(res => {
            if (res.data.code === 200) {
              this.authMethod.tableData = res.data.data

              // let row_op = this.authMethod.tableData[1];
              // let row_log = this.authMethod.tableData[3];
              // if(row_op != null && row_log != null) {
              //   if(!row_op.manage) {
              //     row_log.scan = false
              //     row_log._scan = true
              //   }
              // }

              this.authMethod.dialogMethodVisible = true
            } else {
              this.authMethod.tableData = []
              this.authMethod.dialogMethodVisible = false
            }
          })
        }
      }
    },
    handleRow (row, type) {
      switch (type) {
        case 'setAuth':
          this.showMethodAuth(row)
          break
        case 'delAuth':
          this.handleDelete(row)
      }
    },
    // 删除
    handleDelete (row) {
      if (this.global.objId === row.objId || this.global.objPostId === row.objId) {
        this.$message({
          message: '自身授权不能删除！',
          type: 'warning',
          duration: 500
        })
      } else if (row.objId === this.global.crccAdminId) {
        this.$message({
          message: '管理员授权不能删除！',
          type: 'warning',
          duration: 500
        })
      } else {
        this.$confirm('将永久删除' + row.objName + '此项权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          LoginApi.deleteAuth(this.global.providerId, this.global.userId, row.objProvider, row.objId)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除权限成功!',
                  duration: 500
                })

                this.refreshTable(this.clickNode.provider, this.clickNode.id)
              }
            }).catch(err => {
              console.log(err)
              this.$message({
                message: '权限删除失败！',
                type: 'warning',
                duration: 500
              })
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 500
          })
        })
      }
    },
    // 表格多选框赋值
    selectCheckbox (val) {
      this.selectRows = val
    },
    // 删除前判断
    judgeHandleDelete (row) {
      if (this.global.objId === row.objId) {
        return false
      } else if (this.global.objPostId === row.objId) {
        return false
      } else { return this.global.crccAdminId !== row.objId }
    },
    // 批量删除
    delCheckedAuth () {
      let pdDel = true
      for (let i = 0; i < this.selectRows.length; i++) {
        if (!this.judgeHandleDelete(this.selectRows[i])) {
          pdDel = false
        }
      }

      const authList = []
      for (const i in this.selectRows) {
        const auth = {}
        auth.providerId = this.global.providerId
        auth.operatorId = this.global.userId
        auth.objProvider = this.selectRows[i].objProvider
        auth.objId = this.selectRows[i].objId
        authList.push(auth)
      }

      if (pdDel) {
        this.$confirm('将永久删除' + authList.length + '项权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          LoginApi.deleteAuthList(authList).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '删除权限成功!',
                duration: 500
              })

              this.refreshTable(this.clickNode.provider, this.clickNode.id)
            }
          }).catch(err => {
            console.log(err)
            this.$message({
              message: '权限删除失败！',
              type: 'warning',
              duration: 500
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
            duration: 500
          })
        })
      } else {
        this.$message({
          message: '选择的权限中包含了自身或管理员权限！',
          type: 'warning',
          duration: 500
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  /*注意deep两侧都要有空格*/
  .el-table-column >>> .el-table {
    td:not(.is-hidden):last-child {
      right: -1px;
    }
  }

  .el-table >>> .disabledSelection .cell .el-checkbox__inner {
    display: none;
  }

  .el-table >>> .disabledSelection .cell::before {
    content: '管理';

    left: 10px;
  }

  .el-table >>> .disabledSelection1 .cell .el-checkbox__inner {
    display: none;
  }

  .el-table >>> .disabledSelection1 .cell::before {
    content: '浏览';
    left: 10px;
  }
</style>
