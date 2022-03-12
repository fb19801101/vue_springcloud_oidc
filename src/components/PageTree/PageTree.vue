<template>
  <div class="flex-page-tree-container">
    <el-scrollbar class="flex-page-tree-scroll"
                  :native = "false"
                  v-loading="treeLoading"
                  @contextmenu.prevent="handleTreeClick">
      <el-tree ref="tree" class="flex-page-tree-body"
      highlight-current
      :node-key="nodeKey"
      :data="treeData"
      :props="treeProps"
      :show-checkbox="checkbox"
      :draggable="draggable"
      :default-expand-all="expandAll"
      :check-strictly="checkStrictly"
      :expand-on-click-node="expandClickNode"
      :check-on-click-node="checkClickNode"
      :default-expanded-keys="defaultExpanded"
      :default-checked-keys="defaultChecked"
      :lazy="loadType === 2"
      :load="handleLoadNode"
      :allow-drop="handleDrop"
      :filter-node-method="filterNode"
      @node-click="handleClickLeft"
      @node-contextmenu="handleClickRight"
      @check="handleCheck"
      @check-change="handleCheck"
      @current-change="handleCheck"
      @node-expand="handleCheck">
      <span class="tree-node-slot-span" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="tree-node-context-menu"
          v-if="rightClickNode && rightClickNode.id === node.id"
          v-show="rightMenuShow">
          <ul>
            <li v-for="(item, index) in rightMenu.filter(item => item.show)"
              :key="index"
              @click="handleRightEvent(item.type, data, node, item.vm, item.show)">
              <a>{{ item.name }}</a>
            </li>
          </ul>
        </span>
      </span>
    </el-tree>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'PageTree',
  props: {
    // 节点的key字段名称, 每个树节点用来作为唯一标识的属性
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 树渲染数据(非懒加载时由外部渲染)
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 容器，内部获取到的数据提供外部的接口
    baseData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 设置树状的字段结构
    treeProps: {
      type: Object,
      default: () => {
        return {
          label: 'name', // 指定节点标签为节点对象的某个属性值 string, function(data, node)
          children: 'children', // 指定子树为节点对象的某个属性值 string
          disabled: 'disabled', // 指定节点选择框是否禁用为节点对象的某个属性值 boolean, function(data, node)
          isLeaf: 'leaf' // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 boolean, function(data, node)
        }
      }
    },
    // 是否有选择框
    checkbox: {
      type: Boolean,
      default: false
    },
    // 是否可拖拽
    draggable: {
      type: Boolean,
      default: true
    },
    // 是否全部展开
    expandAll: {
      type: Boolean,
      default: false
    },
    // 在有复选框的时候，是否·遵循父子不互关联
    checkStrictly: {
      type: Boolean,
      default: false
    },
    // 是否在点击节点的时候展开或者收缩节点
    expandClickNode: {
      type: Boolean,
      default: false
    },
    // 是否在点击节点的时候选中节点
    checkClickNode: {
      type: Boolean,
      default: false
    },
    // 默认展开项
    defaultExpanded: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 默认选中的项
    defaultChecked: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 默认高亮当前选中节点
    defaultHighlightNode: {
      type: Number,
      default: 0
    },
    // 默认点击的项 (设置为obj，保证能一直监听到数据的变化)
    defaultClickedNode: {
      type: Object,
      default: () => {
        return {}
      }
    },

    // 加载方式
    loadType: {
      type: Number,
      default: 1 // 1: 正常通过接口加载 2: 懒加载 3: 传入数据
    },
    // 懒加载相关数据 key -> 唯一标识 label -> 显示 type -> 类型 api -> 接口 params -> 参数 resFieldList -> 响应 leaf -> 是否叶子节点
    lazyInfo: {
      type: Array,
      default: () => {
        return [
          {
            key: 'id', // 节点id
            label: 'label', // 节点名称字段
            type: '', // 节点类型
            api: () => {}, // 获取数据的接口
            params: { key: '', value: '', type: 'url' }, // url/query->{data: [{key: '', value: '', default: ''}] type: 'query'}
            resFieldList: [], // 数据响应成功的字段列表
            leaf: true // 是否叶子节点
          }
        ]
      }
    },
    // 正常加载相关 key -> 唯一标识 label -> 显示 api -> 接口 params -> 参数 resFieldList -> 响应
    loadInfo: {
      type: Object,
      default: () => {
        return {
          key: 'id', // 节点id
          label: 'label', // 节点名称字段
          api: () => {}, // 获取数据的接口
          params: { key: '', value: '', type: 'url' }, // url/query->{data: [{key: '', value: '', default: ''}] type: 'query'}
          resFieldList: [] // 数据响应成功的字段列表
        }
      }
    },

    // 是否需要右键菜单
    rightClick: {
      type: Boolean,
      default: true
    },
    // 右键菜单事件
    rightEvent: {
      type: String,
      default: 'delete'
    },
    // 右键菜单列表
    rightMenu: {
      type: Array,
      default: () => {
        return [
          {
            show: false,
            type: 'append',
            name: '添加',
            data: null,
            node: null,
            vm: null
          },
          {
            show: false,
            type: 'modify',
            name: '编辑',
            data: null,
            node: null,
            vm: null
          },
          {
            show: false,
            type: 'remove',
            name: '删除',
            data: null,
            node: null,
            vm: null
          }
        ]
      }
    },
    // 设置节点过滤文本
    filterText: {
      type: String,
      default: null
    },
    // 传入一个随机数，让树组件更新
    treeRefresh: {
      type: Number,
      default: 0
    },
    // 要刷新的层级
    refreshLevel: {
      type: Number,
      default: 0
    },
  },
  data () {
    return {
      treeLoading: false,
      rightMenuShow: false,
      node: null,
      rightClickNode: null,
      // 每个level的节点信息
      nodeInfoList: {}
    }
  },
  watch: {
    defaultChecked (val) {
      const _this = this
      // 将节点选中的状态初始化
      _this.$refs.tree.setCheckedNodes([])
      // const result = [];
      for (let i = 0; i < val.length; i++) {
        // result.push(data.data[i].id);
        // 得到选中的节点,这个方法ojbk
        _this.$refs.tree.setChecked(val[i], true)
      }
    },
    rightMenuShow (val) {
      const _this = this
      if (val) {
        document.body.addEventListener('click', _this.handleCloseMenu)
      } else {
        document.body.removeEventListener('click', _this.handleCloseMenu)
      }
    },
    // eslint-disable-next-line no-unused-vars
    treeRefresh (val) {
      const _this = this
      if (_this.lazy) {
        const level =
          'node' + (_this.refreshLevel - 1 >= 0 ? _this.refreshLevel - 1 : 0)
        _this.nodeInfoList[level].node.childNodes = [] // 清空子节点, 保证数据不会重复渲染
        _this.handleLoadNode(
          _this.nodeInfoList[level].node,
          _this.nodeInfoList[level].resolve
        )
      } else {
        _this.initData()
      }
      // 关闭菜单
      _this.handleCloseMenu()
    },
    // 树组件默认高亮的节点
    defaultHighlightNode (val) {
      const _this = this
      _this.$nextTick(() => {
        _this.$refs.tree.setCurrentKey(val)
      })
    },
    // 页面默认点击的节点
    defaultClickedNode (val) {
      const _this = this
      if (!val.id) return
      const data = _this.lazy ? _this.lazyInfo : _this.loadInfo
      _this.$emit('handleEvent', 'leftClick', {
        data: _this.getSelectData(data.key, _this.baseData, val.id)
      })
    },
    // 过滤节点
    filterText (val) {
      this.$refs.tree.filter(val.trim())
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    // 过滤节点
    filterNode (value, data) {
      if (!value) return true
      return data[this.treeProps.label].indexOf(value) !== -1
    },
    // 树盒子的右键点击事件
    // eslint-disable-next-line no-unused-vars
    handleTreeClick (e) {
      const _this = this
      if (!_this.rightClick) return

      // 显示菜单，并且根据点击的位置生成菜单显示的坐标
      _this.rightMenuShow = true
      // 初始菜单
      _this.rightMenu = [
        {
          name: '刷新',
          type: 'refreshTree',
          data: null,
          node: null,
          vm: null,
          show: true
        }
      ]
    },
    // 节点左键点击
    handleClickLeft (data, node) {
      const _this = this
      // 关闭菜单
      _this.handleCloseMenu()
      const parent = node.parent.data.children || node.parent.data
      _this.$emit('handleEvent', 'leftClick', { data, parent })
    },
    // 右键的点击事件 => 参数依次为 event, 数据， 节点， 节点组件本身
    handleClickRight (event, data, node) {
      const _this = this
      if (!_this.rightClick) return
      // 显示菜单，并且根据点击的位置生成菜单显示的坐标
      _this.rightMenuShow = true
      _this.rightClickNode = node
    },
    // 右键的事件触发, 派发到父组件处理 => 参数依次为 事件名称, 数据， 节点， 节点组件本身
    handleRightEvent (type, data, node, vm) {
      const _this = this

      // var seen = [];
      // var replacer = function(key, value) {
      //   if (typeof value === "object" && value !== null) {
      //     if (seen.indexOf(value) >= 0) {
      //       return;
      //     }
      //     seen.push(value);
      //   }
      //   return value;
      // };

      const parent = node.parent.data.children || node.parent.data
      _this.$emit('handleEvent', 'rightEvent', { type, data, parent, vm })
    },
    // 关闭右键菜单
    handleCloseMenu () {
      const _this = this
      _this.rightMenuShow = false
    },
    // 选择框的点击事件
    handleCheck () {
      const _this = this
      // 获取半选中的节点和key
      const half = _this.$refs.tree.getHalfCheckedNodes()
      const halfKeys = _this.$refs.tree.getHalfCheckedKeys()
      // 得到全选中的节点和key
      const checked = _this.$refs.tree.getCheckedNodes()
      const checkedKeys = _this.$refs.tree.getCheckedKeys()
      // 将当前选择的数据派发到父级处理
      _this.$emit('handleEvent', 'treeCheck', {
        // 半选中和全选中的节点
        keys: halfKeys.concat(checkedKeys),
        // 半选中和全选中的node
        nodes: half.concat(checked),
        // 半选中的节点
        halfKeys,
        // 全选中的节点
        checkedKeys,
        // 半选中的node
        half,
        // 全选中的node
        checked
      })
    },
    // 取消选择框
    setCheckedNodes (arr) {
      this.$refs.tree.setCheckedNodes(arr)
    },
    // 是否可以放置, 设置为只能同一层级拖拽
    handleDrop (draggingNode, dropNode, type) {
      return draggingNode.level === dropNode.level && type !== 'inner'
    },
    // 正常通过接口加载
    initData () {
      const _this = this
      // 非正常加载
      if (_this.loadType !== 1) return
      // 加载loading
      _this.treeLoading = true
      const treeProps = _this.treeProps
      const loadInfo = _this.loadInfo
      const params = loadInfo.params || {}
      let data
      if (params.type === 'url') {
        data = params.value
      } else if (params.type === 'query') {
        data = {}
        params.data.forEach(item => {
          data[item.key] = item.value
        })
      } else {
        // console.log('没有传参数类型')
      }
      loadInfo
        .api(data)
        .then(res => {
          let arr = []
          if (res.data.code === 200) {
            let resData = res
            const resFieldList = loadInfo.resFieldList
            // 得到定义的响应成功的数据字段
            for (let i = 0; i < resFieldList.length; i++) {
              resData = resData[resFieldList[i]]
            }
            // 数据处理
            arr = JSON.parse(JSON.stringify(resData))
            arr.forEach(item => {
              // 保证刷新之后key的唯一
              item.key = item[loadInfo.key]
              item[treeProps.label] = item[loadInfo.label]
            })
            // 得到数据后把数据给到父级，方便父级用到
            _this.$emit('update:baseData', arr)
            // 设置默认高亮
            if (
              _this.defaultHighlightNode ||
              _this.defaultHighlightNode === 0
            ) {
              _this.$nextTick(() => {
                _this.$refs.tree.setCurrentKey(_this.defaultHighlightNode)
              })
            }
            // 设置默认点击
            if (
              _this.defaultClickedNode &&
              (_this.defaultClickedNode.id || _this.defaultClickedNode.id === 0)
            ) {
              // 页面初始化，设置默认点击项， 并将点击事件派发到父级
              _this.$emit('handleEvent', 'leftClick', {
                data:
                  _this.getSelectData(
                    loadInfo.key,
                    _this.baseData,
                    _this.defaultClickedNode.id
                  ) || {}
              })
            }
          } else {
            _this.$message({
              showClose: true,
              message: res.data.msg,
              type: res.data.code === 200 ? 'success' : 'error',
              duration: 3500
            })
          }
          // 加载loading
          _this.treeLoading = false
        })
        .catch(() => {
          // 加载loading
          _this.treeLoading = false
        })
    },
    // 在树状数据中找到某一条数据
    getSelectData (key, data, val) {
      for (const item of data) {
        if (item[key] === val) {
          return item
        }
      }
    },
    // 懒加载数据
    handleLoadNode (node, resolve) {
      const _this = this
      // 非懒加载
      if (_this.loadType !== 2) return
      // 加载loading

      if (node.level === 0) {
        if (_this.refreshLevel > 0) {
          return resolve(_this.baseData)
        } else {
          _this.treeLoading = true
        }
      }

      // 存下每个懒加载的数据
      _this.$set(_this.nodeInfoList, 'node' + node.level, {
        node,
        resolve
      })
      // 懒加载延迟时间
      const timeStamp = 100
      const treeProps = _this.treeProps
      const levelInfo = _this.lazyInfo[node.level > _this.refreshLevel ? 1 : 0]
      const params = levelInfo.params
      let data
      if (params.type === 'url') {
        data = params.value != null ? params.value : node.data[levelInfo.key]
      } else if (params.type === 'query') {
        data = {}
        params.data.forEach(item => {
          data[item.key] = item.value != null ? item.value : node.data[item.key]
        })
      } else {
        console.log('没有传参数类型')
      }

      levelInfo
        .api(data)
        .then(res => {
          let arr = []
          if (res.data.code === 200) {
            let resData = res
            const resFieldList = levelInfo.resFieldList
            // 得到定义的响应成功的数据字段
            for (let i = 0; i < resFieldList.length; i++) {
              resData = resData[resFieldList[i]]
            }

            // 数据处理
            arr = JSON.parse(JSON.stringify(resData))
            arr.forEach(item => {
              // 保证key的唯一
              item.key = item.provider + '-' + item[levelInfo.key]
              item['level_' + node.level + '_data'] = node.data
              item[treeProps.label] = item[levelInfo.label]

              if (params.type === 'query') {
                const data = {}
                params.data.forEach(param => {
                  data[param.key] = param.value != null ? param.value : item[param.key]
                })

                levelInfo
                  .api(data)
                  .then(res => {
                    if (res.data.code === 200) {
                      item[treeProps.isLeaf] = res.data.data != null && res.data.data.length > 0 ? !levelInfo.leaf : levelInfo.leaf
                    } else {
                      item[treeProps.isLeaf] = levelInfo.leaf
                    }
                  }).catch(err => {
                    console.log(err)
                  })
              }

              // item[treeProps.isLeaf] = item.hasOwnProperty('type')
              //   ? item.type < levelInfo.type
              //     ? !levelInfo.leaf
              //     : levelInfo.leaf
              //   : levelInfo.leaf
            })
            // 得到数据后把数据给到父级，方便父级用到
            _this.$emit('update:baseData', [..._this.baseData, ...arr])
            // 设置默认高亮
            if (
              _this.defaultHighlightNode ||
              _this.defaultHighlightNode === 0
            ) {
              _this.$nextTick(() => {
                _this.$refs.tree.setCurrentKey(_this.defaultHighlightNode)
              })
            }
            // 设置默认点击
            if (
              _this.defaultClickedNode &&
              (_this.defaultClickedNode.id || _this.defaultClickedNode.id === 0)
            ) {
              // 页面初始化，设置默认点击项， 并将点击事件派发到父级
              _this.$emit('handleEvent', 'leftClick', {
                data:
                  _this.getSelectData(
                    levelInfo.key,
                    _this.baseData,
                    _this.defaultClickedNode.id
                  ) || {}
              })
            }
          } else {
            // _this.$message({
            //   showClose: true,
            //   message: res.data.msg,
            //   type: res.data.code === 200 ? 'success' : 'error',
            //   duration: 3500
            // })
          }
          // 延迟加载，保证加载动画
          setTimeout(() => {
            resolve(arr)
          }, timeStamp)
          // 加载loading
          if (node.level === 0) {
            _this.treeLoading = false
          }
        })
        .catch(() => {
          // 延迟加载，保证加载动画
          setTimeout(() => {
            resolve([])
          }, timeStamp)
          // 加载loading
          if (node.level === 0) {
            _this.treeLoading = false
          }
        })
    },
    // 添加节点
    append (node, data, vm) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 0, vm)
    },
    // 修改节点
    modify (node, data, vm) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1, vm)
    },
    // 删除节点
    remove (node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>

<style lang="stylus" scoped>
.flex-page-tree-container >>> {
  margin-left: 5px;
  flex-display();
  flex-direction(column);
  flex-justify-content(space-between);
  background-color: $white;
  color: $gray-black;
  height: calc(100vh - 170px);
  .flex-page-tree-scroll {
    flex(1);
    white-space: nowrap;
    overflow: hidden;
    .el-scrollbar__wrap {
      overflow: scroll;
      height: calc(100% + 17px);
      .el-scrollbar__view {
        background-color: $white;
        color: $gray-black;
        .flex-page-tree-body {
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Chrome/Safari/Opera */
          -khtml-user-select: none; /* Konqueror */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none; /* Non-prefixed version, currently */
          width: 100%
          el-tree-node__content {
            .tree-node-slot-span {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
            .tree-node-context-menu {
              position: absolute;
              float: left;
              width: 100px;
              margin: 0 50px;
              ul {
                position: absolute;
                float: left;
                list-style: none;
                margin: 0;
                padding: 0;
                z-index: 3000;
                font-size: 12px;
                font-weight: 400;
                color: #333 !important;
                background: #fff !important;
                border-radius: 4px;
                border: 1px solid #ccc !important;
                box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
                li {
                  float: left;
                  width: 100%;
                  line-height: 25px;
                  text-align: center;
                  position: relative;
                  border: 1px solid #ccc !important;
                  a {
                    text-decoration: none;
                    color: #a8a8a8 !important;
                    display: block;
                    padding: 0 10px;
                    &:hover {
                      background-color: #2f4056 !important;
                      color: #fff !important;
                    }
                  }
                  ul {
                    float: left;
                    position: absolute;
                    display: none;
                    padding: 0;
                    li {
                      float: none;
                      width: 100%;
                      line-height: 20px;
                      text-align: left;
                      a {
                        text-decoration: none;
                        color: #a8a8a8 !important;
                        display: block;
                        margin-left: 10px;
                        padding: 0 10px;
                        &:hover {
                          background-color: #2f4056 !important;
                          color: #fff !important;
                        }
                      }
                    }
                  }
                  &:hover ul {
                    display: block;
                  }
                }
              }
            }

            }
          }
          .el-tree-node__content:hover {
            background-color: $gray-white;
            color: $gray;
          }
        }
      }
    }
    //定义滚动条宽高
    > .el-scrollbar__bar {
      z-index: 9999;
      &.is-horizontal {
      }
      &.is-vertical {
        height: 100%;
        width: 10px;
        background-color: transparent;
      }
    }
    //定义滚动条里面的中间条颜色
    .el-scrollbar__thumb {
      background-color: $gray-white;
      border-radius: 5px;
      transition: background 0.4s;
    }
    .el-scrollbar__thumb:hover {
      background: $grey;
    }
  }
}
</style>
