<template>
  <div>
    <el-button type="primary" plain @click="showPeopleAuth">添加授权人员</el-button>
    <el-dialog class="people-dialog" title="添加授权人员" :visible.sync="dialogPeopleVisible" center :close-on-click-modal="false">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <div class="con-box-l">
            <div>
              <el-popover placement="bottom-start" width="400" trigger="click">
                <el-table :data="searchData" size="mini" max-height="350" @row-click="selectData" :key="search">
                  <el-table-column width="150" property="name" label="姓名" align="center"></el-table-column>
                  <el-table-column width="250" property="path" label='路径'></el-table-column>
                </el-table>
                <el-input size="mini" slot="reference" placeholder="搜索 成员、部门" v-model="searchUser" @focus="handFocus"></el-input>
              </el-popover>
            </div>
            <div style="height:50vh; overflow: auto">
              <page-tree
                ref="tree"
                :checkbox="false"
                :base-data.sync="lazyData.baseData"
                :node-key="lazyData.nodeKey"
                :load-type="2"
                :lazy-info="lazyData.lazyInfo"
                :tree-refresh="lazyData.refresh"
                :refresh-level="lazyData.refreshLevel"
                @handleEvent="handleEvent"
                style="margin-left: 10px"
              />
            </div>
          </div>
        </el-col>
        <el-col :span="4" align="middle" class="col-btns">
          <el-button @click="addPeopleAuth" :disabled="clickNodeType !== undefined" icon="el-icon-arrow-right" style="margin-top: 100px"></el-button>
          <br/>
          <el-button @click="addPeopleAuth" :disabled="clickNodeType !== 3" icon="el-icon-d-arrow-right" style="margin-top: 10px"></el-button>
          <br/>
          <el-button @click="delPeopleAuth" :disabled="selectKeyArr.length === 0" icon="el-icon-arrow-left" style="margin-top: 10px"></el-button>
          <br/>
          <el-button @click="delPeopleAuth('all')" :disabled="keyArr.length === 0" icon="el-icon-d-arrow-left" style="margin-top: 10px"></el-button>
        </el-col>
        <el-col :span="10">
          <div class="con-box-r" style="height:50vh; overflow: auto">
            <page-table
              ref="table"
              :checkbox="true"
              :cols="cols"
              :rows="rows"
              :refresh="refresh"
              @selectCheckbox="selectCheckbox"
            />
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePeopleAuth">取 消</el-button>
        <el-button type="primary" @click="savePeopleAuth">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LoginApi from '@/api/login'
import PageTree from '@/components/PageTree/PageTree'
import PageTable from '@/components/PageTable/PageTable'

export default {
  name: 'PeopleAuth',
  components: { PageTree, PageTable },
  props: ['clickNode'],
  data () {
    return {
      cols: [],
      rows: [],
      refresh: '',

      search: '',

      dialogPeopleVisible: false,
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      // 点击节点标识
      clickNodeType: 0,
      // 点击节点数据
      clickNodeData: undefined,
      // 表格的数据
      keyArr: [],
      // 表格多选框选择的数据
      selectKeyArr: [],
      // 搜索弹框表格数据
      searchData: [],
      nodeClick: {},
      // 输入框数据
      searchUser: '',

      lazyData: {
        refresh: 1,
        refreshLevel: 0,
        nodeKey: 'key',
        baseData: [], // 树的基础数据，从组件中获取到
        lazyInfo: [
          {
            key: 'id', // 节点唯一标识字段
            label: 'name', // 节点显示字段
            type: 4, // 数据类型 单位
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
            type: 4, // 数据类型 单位 部门 岗位
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
        prop: 'name',
        label: '姓名'
      }
    ]
  },
  watch: {
    searchUser: function (val, oldVal) {
      if (val !== oldVal && this.clickNodeData !== undefined) {
        this.searchData = []
        if (val.length > 0) {
          this.searchData = []
          LoginApi.getSearchUsers(this.clickNodeData.provider, this.clickNodeData.id, this.clickNodeData.type, this.searchUser).then(res => {
            if (res.data.code === 200) {
              this.searchData = res.data.data
            }
          }).catch(err => {
            console.log(err)
          })
        }

        this.search = Date.now().toString(36)
      }
    }
  },
  methods: {
    lazyApiRoot () {
      return LoginApi.currentAuthRootNode(this.global.providerId, this.global.userId)
    },
    lazyApiChildren (param) {
      if (param.type === 3) {
        return LoginApi.getPositionUsers(param.provider, param.id)
      } else {
        return LoginApi.getOrganizationChildren(param.provider, param.id, param.type)
      }
    },
    handleEvent (event, node) {
      if (event === 'leftClick') {
        this.clickNodeType = node.data.type
        this.clickNodeData = node.data

        if (this.searchUser.length > 0) {
          this.searchData = []
          LoginApi.getSearchUsers(this.clickNodeData.provider, this.clickNodeData.id, this.clickNodeData.type, this.searchUser).then(res => {
            if (res.data.code === 200) {
              this.searchData = res.data.data
            }
          }).catch(err => {
            console.log(err)
          })

          this.search = Date.now().toString(36)
        }
      }
    },
    initData () {
      const _this = this
      _this.dialogPeopleVisible = false
      _this.rows = []
      _this.checkList = []
      _this.data = []
      _this.clickNodeType = 0
      _this.clickNodeData = {}
      _this.keyArr = []
      _this.selectKeyArr = []
      _this.searchData = []
      _this.nodeClick = {}
      _this.searchUser = ''
      _this.lazyData.baseData = []
      _this.refresh = ''
    },
    getData (node) {
      if (node.type === undefined) {
        let addOne = true
        this.keyArr.forEach(val => {
          if (node.id === val.id) {
            addOne = false
          }
        })
        if (addOne) {
          this.keyArr.push({
            id: node.id,
            name: node.name,
            provider: node.provider
          })
        }
      }
      if (node.type === 3) {
        LoginApi.getPositionUsers(node.provider, node.id).then(res => {
          res.data.data.forEach(val => {
            let addSome = true
            this.keyArr.forEach(value => {
              if (val.id === value.id) {
                addSome = false
              }
            })
            if (addSome) {
              this.keyArr.push({
                id: val.id,
                name: val.name,
                provider: val.provider
              })
            }
          })
        })
      }
    },
    removeData (data) {
      const checklist = this.keyArr
      for (let i = 0; i < checklist.length; i++) {
        if (checklist[i].name === data.name) {
          checklist.splice(i, 1)
        }
      }
      this.keyArr = checklist
      this.$refs.tree.setCheckedNodes(this.keyArr)
    },
    showPeopleAuth () {
      if (this.clickNode.name === undefined) {
        this.$message({
          message: '请选择权限范围！',
          type: 'warning'
        })
      } else {
        this.dialogPeopleVisible = true
      }
    },
    savePeopleAuth () {
      const peopleList = []
      for (const i in this.keyArr) {
        const people = {}
        people.providerId = this.global.providerId
        people.operatorId = this.global.userId
        people.objProvider = this.keyArr[i].provider
        people.objId = this.keyArr[i].id
        people.objType = 0
        people.nodeProvider = this.clickNode.provider
        people.nodeId = this.clickNode.id
        people.nodeType = this.clickNode.type
        peopleList.push(people)
      }

      LoginApi.addAuthList(peopleList).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加 ' + res.data.count + ' 个人员权限成功!'
          })

          this.$emit('refreshTable', this.clickNode.provider, this.clickNode.id)
        }
      }).catch(err => {
        console.log(err)
      })

      this.initData()
    },
    closePeopleAuth () {
      this.initData()
    },
    addPeopleAuth () {
      this.getData(this.clickNodeData)
      this.rows = this.keyArr
      this.refresh = Date.now().toString(36)
    },
    delPeopleAuth (key) {
      if (this.selectKeyArr.length === 0 || key === 'all') {
        this.keyArr = []
      } else {
        this.selectKeyArr.forEach(val => {
          for (let i = 0; i < this.keyArr.length; i++) {
            if (this.keyArr[i].id === val.id) {
              this.keyArr.splice(i, 1)
            }
          }
        })
      }

      this.rows = this.keyArr
      this.refresh = Date.now().toString(36)
    },
    selectCheckbox (val) {
      this.selectKeyArr = val
    },
    selectData (row) {
      this.getData(row)
      this.rows = this.keyArr
      this.refresh = Date.now().toString(36)
    },
    handFocus () {
      if (this.clickNodeData === undefined) {
        this.$message({
          message: '请先选择搜索节点！',
          type: 'warning'
        })
      } else {
        if (this.searchUser.length > 0 && this.searchData.length === 0) {
          LoginApi.getSearchUsers(this.clickNodeData.provider, this.clickNodeData.id, this.clickNodeData.type, this.searchUser).then(res => {
            if (res.data.code === 200) {
              this.searchData = res.data.data
              this.search = Date.now().toString(36)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .con-box-l {
    border: 1px solid #D5D5D5;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .con-box-r {
    margin-top: 30px
    border: 1px solid #D5D5D5;

    li {
      margin-bottom: 5px;
    }

    .el-divider {
      margin-top: -1px;
    }
  }

  .el-icon-arrow-right {
    margin-left: 10%;
    margin-bottom: 50%;
  }

  .con-box-div {
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-family: "Microsoft YaHei UI";
    font-weight: bold;
    vertical-align: middle;
    text-align: center
    margin: 0 auto;

    span {
      display: block;
      line-height: 40px;
    }
  }

  //scss/less /deep/**
  //stylus >>>**
  .people-dialog >>> .el-dialog {
    //给 el-dialog__body 加 overflow auto 实现 body内部滚动
    display: flex;
    flex-direction: column;
    margin: 0 !important;

    //通过 transform 来实现水平和垂直居中
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    //设置对话框的高度和宽度
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    height: 780px;
    width: 800px;

    //给 el-dialog__body 加 overflow auto 实现 body内部滚动

    .el-dialog__body {
      flex: 1;
      overflow: auto;
    }
  }
</style>
