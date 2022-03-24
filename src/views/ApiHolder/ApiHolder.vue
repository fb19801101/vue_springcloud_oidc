<template>
  <div class="flex-container-body">
    <div class="flex-body-table">
      <div class="flex-table-title">
        <div class="flex-title-left">
          <span class="text-title-20">API注册信息</span>
        </div>
        <div class="flex-title-right">
          <el-select v-model="uriFilter" placeholder="请选择调转地址类型" @change="uriChanged">
            <el-option value="localhost" label="http://localhost/"></el-option>
            <el-option value="197" label="http://192.168.100.197/"></el-option>
            <el-option value="198" label="http://192.168.100.198/"></el-option>
            <el-option value="199" label="http://192.168.100.199/"></el-option>
            <el-option value="ldsc" label="http://ldsc.cr121.com/"></el-option>
            <el-option value="ames" label="http://ames.cr121.com/"></el-option>
          </el-select>
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
          @handleRow="handleRow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LoginApi from '@/api/login'
import PageTable from '@/components/PageTable/PageTable'

export default {
  name: 'ApiHolder',
  components: { PageTable },
  data () {
    return {
      cols: [],
      rows: [],
      page: {},
      search: {},
      refresh: '',
      filters: [],
      tableData: [],
      uriFilter: 'ldsc'
    }
  },
  created () {
    this.cols = [
      {
        id: 1,
        prop: 'id',
        label: '应用编号',
        sort: true,
        width: 100,
        align: 'center'
      },
      {
        id: 2,
        prop: 'clientName',
        label: '应用简称',
        sort: true,
        width: 150,
        align: 'center'
      },
      {
        id: 3,
        prop: 'clientFullName',
        label: '应用全称',
        width: 250,
        align: 'center'
      },
      {
        id: 4,
        label: '测试API',
        slot: [{
          type: 'apiInfo',
          name: '注册信息'
        }, {
          type: 'apiCheck',
          name: '注册验证'
        }, {
          type: 'loginApi',
          name: '跳转应用'
        }, {
          type: 'callApi',
          name: '调用API'
        }],
        width: 350,
        align: 'center'
      },
      {
        id: 5,
        prop: 'clientId',
        label: '客户端ID',
        width: 180,
        align: 'left'
      },
      // {
      //   id: 6,
      //   prop: 'clientSecret',
      //   label: '客户端密匙',
      //   width: 300,
      //   align: 'center'
      // },
      // {
      //   id: 7,
      //   prop: 'clientRedirectUris',
      //   label: '应用回调地址',
      //   width: 200,
      //   align: 'center'
      // },
      {
        id: 6,
        prop: 'apiName',
        label: 'API注册名称',
        width: 160,
        align: 'left'
      },
      // {
      //   id: 9,
      //   prop: 'apiResourceId',
      //   label: 'API资源ID',
      //   width: 150,
      //   align: 'center'
      // },
      // {
      //   id: 10,
      //   prop: 'apiClientId',
      //   label: 'API注册ID',
      //   width: 150,
      //   align: 'center'
      // },
      // {
      //   id: 11,
      //   prop: 'apiClientSecret',
      //   label: 'API注册密匙',
      //   width: 200,
      //   align: 'center'
      // },
      {
        id: 7,
        prop: 'apiScope',
        label: 'API注册权限',
        align: 'left'
      }
      // {
      //   id: 13,
      //   prop: 'apiScopeCall',
      //   label: 'API调用范围',
      //   width: 200,
      //   align: 'center'
      // },
      // {
      //   id: 14,
      //   prop: 'webUriPc',
      //   label: '门户WEB地址',
      //   width: 200,
      //   align: 'center'
      // },
      // {
      //   id: 15,
      //   prop: 'webUriApp',
      //   label: '门户移动地址',
      //   width: 200,
      //   align: 'center'
      // },
      // {
      //   id: 16,
      //   prop: 'webApiUri',
      //   label: '应用聚合地址',
      //   width: 200,
      //   align: 'center'
      // },
      // {
      //   id: 17,
      //   prop: 'webApiTodo',
      //   label: '待办聚合地址',
      //   width: 200,
      //   align: 'center'
      // },
      // {
      //   id: 18,
      //   prop: 'webApiInfo',
      //   label: '信息聚合地址',
      //   width: 200,
      //   align: 'center'
      // },
      // {
      //   id: 19,
      //   prop: 'discoveryEndpoint',
      //   label: '认证服务地址',
      //   width: 200,
      //   align: 'center'
      // }
    ]

    this.page = { show: 1, total: 0, sizes: [10, 20, 30, 50], size: 30, cur: 1, layout: 'total, sizes, prev, pager, next, jumper' }
    this.filters = [{ prop: 'level' }, { prop: 'work' }]

    this.getData()
  },
  methods: {
    getData () {
      LoginApi.apiList().then(res => {
        if (res.data.code === 200) {
          const apis = res.data.data
          const size = res.data.count
          this.tableData = []
          for (let i = 0; i < size; i++) {
            const api = {
              id: i + 1,
              clientName: apis[i].clientName,
              clientFullName: apis[i].clientFullName,
              clientId: apis[i].clientId,
              clientSecret: apis[i].clientSecret,
              clientRedirectUris: apis[i].clientRedirectUris.toString(),
              apiName: apis[i].apiName,
              apiResourceId: apis[i].apiResourceId,
              apiClientId: apis[i].apiClientId,
              apiClientSecret: apis[i].apiClientSecret,
              apiScope: apis[i].apiScope.toString(),
              apiScopeCall: apis[i].apiScopeCall.toString(),
              webUriPc: apis[i].webUriPc,
              webUriApp: apis[i].webUriApp,
              webApiUri: apis[i].webApiUri,
              webApiTodo: apis[i].webApiTodo,
              webApiInfo: apis[i].webApiInfo,
              discoveryEndpoint: apis[i].discoveryEndpoint
            }
            this.tableData.push(api)
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
    },
    handleRow (row, type) {
      switch (type) {
        case 'apiInfo':
          this.apiInfo(row)
          break
        case 'apiCheck':
          this.apiCheck(row)
          break
        case 'loginApi':
          this.loginApi(row)
          break
        case 'callApi':
          this.callApi(row)
          break
      }
    },
    apiInfo (val) {
      LoginApi.apiInfo(val.apiName).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: JSON.stringify(res.data.data, null, 2),
            type: 'info',
            duration: 2000
          })
        } else {
          this.$message({
            message: 'api info failed',
            type: 'warning',
            duration: 1000
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    apiCheck (val) {
      LoginApi.apiInfo(val.apiName).then(res => {
        if (res.data.code === 200) {
          LoginApi.apiCheck(val.apiName).then(res => {
            if (res.data.code === 200) {
              console.log(res.data.data)
              this.$message({
                message: val.clientFullName,
                type: 'info',
                duration: 2000
              })
            } else {
              this.$message({
                message: val.apiName + ' api check failed',
                type: 'warning',
                duration: 1000
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    loginApi (val) {
      LoginApi.apiInfo(val.apiName).then(res => {
        if (res.data.code === 200) {
          LoginApi.apiLogin(val.apiName).then(res => {
            if (res.data.code === 200) {
              window.open(res.data.data, 'top')
            } else {
              this.$message({
                message: res.data.data,
                type: 'warning',
                duration: 1000
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    callApi (val) {
      LoginApi.apiInfo(val.apiName).then(res => {
        if (res.data.code === 200) {
          LoginApi.apiCall(val.apiName).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: res.data.data,
                type: 'info',
                duration: 2000
              })
            } else {
              this.$message({
                message: res.data.data,
                type: 'warning',
                duration: 1000
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    uriChanged (val) {
      LoginApi.uriFilter(val).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: ' uri changed success',
            type: 'info',
            duration: 500
          })
        } else {
          this.$message({
            message: ' uri changed failed',
            type: 'warning',
            duration: 500
          })
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
