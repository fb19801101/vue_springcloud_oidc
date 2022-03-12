<template>
  <div>
    <el-button type="primary" plain @click="showPostAuth">添加授权岗位</el-button>
    <el-dialog class="post-dialog" title="添加授权岗位" :visible.sync="dialogPostVisible" center :close-on-click-modal="false">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <div class="con-box-l">
            <div style="height:50vh; overflow: auto">
              <page-tree
                ref="tree"
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

        <el-col :span="4" align="middle">
          <el-button @click="addPostAuth" :disabled="clickNodeType !== 3" icon="el-icon-arrow-right" style="margin-top: 100px"></el-button>
          <br/>
          <el-button @click="addPostAuth" :disabled="clickNodeType !== 2" icon="el-icon-d-arrow-right" style="margin-top: 10px"></el-button>
          <br/>
          <el-button @click="delPostAuth" :disabled="selectKeyArr.length === 0" icon="el-icon-arrow-left" style="margin-top: 10px"></el-button>
          <br/>
          <el-button @click="delPostAuth('all')" :disabled="keyArr.length === 0" icon="el-icon-d-arrow-left" style="margin-top: 10px"></el-button>
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
        <el-button @click="closePostAuth">取 消</el-button>
        <el-button type="primary" @click="savePostAuth">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LoginApi from '@/api/login'
import PageTree from '@/components/PageTree/PageTree'
import PageTable from '@/components/PageTable/PageTable'

export default {
  components: { PageTree, PageTable },
  props: ['clickNode'],
  data () {
    return {
      cols: [],
      rows: [],
      refresh: '',

      dialogPostVisible: false,
      checkList: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 点击节点标识
      clickNodeType: 0,
      // 点击节点数据
      clickNodeData: {},
      // 表格的数据
      keyArr: [],
      // 表格多选框选择的数据
      selectKeyArr: [],

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
        prop: 'name',
        label: '岗位'
      }
    ]
  },
  methods: {
    lazyApiRoot () {
      return LoginApi.currentAuthRootNode(this.global.providerId, this.global.userId)
    },
    lazyApiChildren (param) {
      return LoginApi.getOrganizationChildren(param.provider, param.id, param.type)
    },
    handleEvent (event, node) {
      if (event === 'leftClick') {
        this.clickNodeType = node.data.type
        this.clickNodeData = node.data
      }
    },
    initData () {
      const _this = this
      _this.dialogPostVisible = false
      _this.rows = []
      _this.checkList = []
      _this.data = []
      _this.clickNodeType = 0
      _this.clickNodeData = {}
      _this.keyArr = []
      _this.selectKeyArr = []
      _this.lazyData.baseData = [{ id: 100000, name: '中国铁建' }]
      _this.refresh = ''
    },
    getData (node) {
      if (node.type === 3) {
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
      if (node.type === 2) {
        LoginApi.getOrganizationChildren(node.provider, node.id, node.type).then(res => {
          res.data.data.forEach(val => {
            let addSome = true
            this.keyArr.forEach(value => {
              if (val.id === value.id || val.type === 2) {
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
      for (var i = 0; i < checklist.length; i++) {
        if (checklist[i].label === data.label) {
          checklist.splice(i, 1)
        }
      }
      this.keyArr = checklist
      this.$refs.tree.setCheckedNodes(this.keyArr)
    },
    showPostAuth () {
      if (this.clickNode.name === undefined) {
        this.$message({
          message: '请选择权限范围！',
          type: 'warning'
        })
      } else {
        this.dialogPostVisible = true
      }
    },
    savePostAuth () {
      const postList = []
      for (const i in this.keyArr) {
        const post = {}
        post.providerId = this.global.providerId
        post.operatorId = this.global.userId
        post.objProvider = this.keyArr[i].provider
        post.objId = this.keyArr[i].id
        post.objType = 1
        post.nodeProvider = this.clickNode.provider
        post.nodeId = this.clickNode.id
        post.nodeType = this.clickNode.type
        postList.push(post)
      }

      LoginApi.addAuthList(postList).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加 ' + res.data.count + ' 个岗位权限成功!'
          })

          this.$emit('refreshTable', this.clickNode.provider, this.clickNode.id)
        }
      }).catch(err => {
        console.log(err)
      })

      this.initData()
    },
    closePostAuth () {
      this.initData()
    },
    addPostAuth () {
      this.getData(this.clickNodeData)
      this.rows = this.keyArr
      this.refresh = Date.now().toString(36)
    },
    delPostAuth (key) {
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
    }
  }
}
</script>

<style lang="stylus" scoped>
  .con-box-l {
    margin-top: 30px
    border: 1px solid #D5D5D5;
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

  .con-box-z {
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
  .post-dialog >>> .el-dialog {
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
