<template>
  <div ref="page" class="flex-page-table-container">
    <el-pagination class="flex-page-table-pagination"
                   v-if="propParams.page.show === 2"
                   @size-change="handleSize"
                   @current-change="handlePage"
                   :current-page.sync="propParams.page.cur"
                   :page-sizes="propParams.page.sizes"
                   :page-size="propParams.page.size"
                   :layout="propParams.page.layout"
                   :total="propParams.page.total"
                   :pager-count="propParams.page.pagers"
                   :hide-on-single-page="propParams.page.single"
                   popper-class='sizes-options'>
        <span class="el-pagination__slot">{{ propParams.page.slot }}</span>
      </el-pagination>
    <div class="flex-page-table-toolbar">
      <div class="flex-page-table-toolbar-left" v-if="propParams.toolbar.show.left">
        <el-button-group>
          <el-tooltip
            v-for="(btn, idx) in propParams.buttons.left"
            :key="idx"
            effect="dark"
            :content="btn.tip"
            placement="bottom">
            <el-button
              v-if="propParams.toolbar.label.left.indexOf(btn.label) !== -1"
              :size="btn.size"
              :icon="btn.icon"
              @click="handleRow(btn.param, btn.event)">
            </el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <div class="flex-page-table-toolbar-search" v-if="propParams.toolbar.show.search">
        <el-tooltip effect="dark" :content="placeholder" placement="bottom">
          <el-input
            v-model="input"
            :placeholder="placeholder"
            @input="handleInput"
            @blur="handleBlur"
            @focus="handleFocus"
            size="mini">
          </el-input>
        </el-tooltip>
      </div>
      <div class="flex-page-table-toolbar-caption" v-if="propParams.toolbar.show.caption">
        <span>{{ caption }}</span>
      </div>
      <div class="flex-page-table-toolbar-right" v-if="propParams.toolbar.show.right">
        <el-button-group>
          <el-tooltip v-for="(btn, idx) in propParams.buttons.right"
            :key="idx"
            effect="dark"
            :content="btn.tip"
            placement="bottom">
            <el-button v-if="propParams.toolbar.label.right.indexOf(btn.label) !== -1"
              :size="btn.size"
              :icon="btn.icon"
              @click="handleRow(btn.param, btn.event)">
            </el-button>
          </el-tooltip>
        </el-button-group>
      </div>
    </div>
    <el-table class="flex-page-table-content"
        ref="table"
        header-row-class-name="el-header"
        :data="rowData"
        :key="refresh"
        border
        stripe
        fit
        :show-summary="summary"
        :summary-method="handleSummary"
        :span-method="handleSpan"
        @sort-change="handleSort"
        @row-click="toggleExpand"
        @selection-change="handleSelectionChange"
        :row-style="rowStyle"
        :header-row-style="headerStyle"
        :show-header="propParams.fragment.showHeader"
        :max-height="propParams.fragment.showHeight ? propParams.fragment.maxHeight : -1">
        <el-table-column v-if="checkbox" type="selection" width="55"></el-table-column>
        <el-table-column v-if="btree" :prop="colTree.prop" :label="colTree.label" :width="colTree.width">
          <template slot-scope="scope">
            <span :style="{ 'padding-left': +scope.row._level * indent + 'px' }"/>
            <span v-show="showTreeIcon(scope.row)" class="el-table-tree-icon" @click="toggleTreeIcon(scope.row)">
              <i v-if="!scope.row._expand" class="el-icon-plus" />
              <i v-else class="el-icon-minus" />
            </span>
            {{ scope.row.node }}
          </template>
        </el-table-column>
        <el-table-column
          v-for="(col, index) in colData"
          :v-if="col.hide ? Boolean(false) : Boolean(true)"
          :key="index"
          :prop="col.prop"
          :align="col.align"
          :align-header="col.align"
          :label="col.label"
          :show-overflow-tooltip="col.overflow ? Boolean(true) : Boolean(false)"
          :sortable="col.sort"
          min-width="50"
          :width="col.width"
          :filters="col.filters"
          :filter-method="col.filters != null ? handleFilter : null"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <i v-if="col.slot != null && col.slot[0].type === 'icon'" :class="col.slot[0].name"></i>
            <el-image v-if="col.slot != null && col.slot[0].type === 'image'" :src="col.slot[0].name"></el-image>
            <span :class="renderClass(scope.row[col.prop], col.render)">{{scope.row[col.prop]}}</span>
            <el-button-group v-for="(it, idx) in col.slot" :key="idx">
              <el-button v-if="it.type !== 'image' && it.type !== 'icon'"
                @click="handleRow(scope.row, it.type)" type="primary" size="mini" plain :disabled="it.disabled">
                {{ it.name }}
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
        <el-table-column
          v-if="expands.button"
          :align="expands.align"
          :align-header="expands.align"
          :label="expands.label"
          :width="expands.width">
          <template slot-scope="scope">
            <el-button type="text" @click="toggleFold(scope.row)">{{expands.caption}}</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="expands.expand" type="expand" width="1">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="el-table-expand">
              <el-form-item>
                <span> 标题 </span>
                <span> 编号 </span>
                <span> 属性 </span>
                <span v-if="expands.slot != null"> 操作 </span>
              </el-form-item>
              <el-form-item
                :label="item.label"
                v-for="(item, index) in scope.row.expands"
                :key="index">
                <span> {{ item.id }} </span>
                <span> {{ item.value }} </span>
                <el-button
                  v-for="(it, idx) in expands.slot"
                  :key="idx"
                  @click="handleItem(item, it.type)"
                  type="primary"
                  size="mini"
                  plain>{{ it.name }}</el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
    <div class="flex-page-table-feedback" v-if="feedback">
      <i v-show="feedback === 'loading'" class="load-icon-item el-icon-loading"></i>
      <span v-if="feedback === 'error' || feedback === 'empty'">
          {{feedback === "error" ? "获取数据失败" : feedback === "empty" ? "暂无数据" : ""}}
        </span>
    </div>
    <el-pagination class="flex-page-table-pagination"
                   v-if="propParams.page.show === 1"
                   @size-change="handleSize"
                   @current-change="handlePage"
                   :current-page.sync="propParams.page.cur"
                   :page-sizes="propParams.page.sizes"
                   :page-size="propParams.page.size"
                   :layout="propParams.page.layout"
                   :total="propParams.page.total"
                   :pager-count="propParams.page.pagers"
                   :hide-on-single-page="propParams.page.single"
                   popper-class='sizes-options'>
        <span class="el-pagination__slot">{{ propParams.page.slot }}</span>
      </el-pagination>
  </div>
</template>

<script>
import treeToArray, { addAttrs } from './eval'

export default {
  name: 'PageTable',
  props: {
    caption: {
      type: String,
      default: ''
    },
    /*
     *   表格配置【cols】：接受一个<对象数组>
     *   字段说明：
     *   【hide】 => Boolean（非必填）=> default: false，为<true>时该列隐藏
     *   【label】 => String（必填） => 表头名称
     *   【prop】 => String（非必填） => 对应单元格的字段 => 有【slot】时不填，否则必填
     *   【render】 => Array（非必填） => 根据单元格内容给出对应的类名
     *              接受一个<<对象数组>>
     *              字段说明：
     *             【myTarget】 => String/Number（必填） => 比较的对象
     *             【myClass】 => String（必填） => 满足条件时的类名
     *             【mode】 => String（非必填） => 比较方法:
     *                        'more' => 大于【myTarget】的值
     *                        'less' => 小于【myTarget】的值
     *                        不填【mode】 => 等于【myTarget】的值
     *   【slot】 => Array => 对应单元格的操作
     *              接受一个<<对象数组>>
     *              字段说明：
     *             【type】 => String（必填） => 操作类型
     *             【name】 => String（必填） => 名字
     *             【disabled】 => Boolean（必填） => 是否控制
     *   【filters】 => Array（非必填） => 对应列的筛选操作
     *              接受一个<<对象数组>>
     *              字段说明：
     *             【text】 => String（必填） => 筛选文字
     *             【value】 => String（必填） => 筛选变量值
     *   【sort】 => String => 排序 custom
     *   【align】 => String => default: left => 为<center>时该列居中对齐, <right>时该列右对齐, 默认局左对齐
     *   【overflow】 => Boolean => default: false => 为<true>时内容溢出隐藏
     *   【tag】 => Object => default: {} => 附加数据
     */
    cols: {
      type: Array,
      default: () => {
        return []
      }
    },
    rows: {
      // 表格数据
      type: Array,
      default: () => {
        return []
        // 【expands】 => Array（非必填） => 附加展开行属性
      }
    },
    page: {
      // 页数配置
      type: Object,
      default: () => {
        return {
          show: 0, // 显示 0 不显示 1 下方 2上方
          total: 0, // 数据量
          sizes: [10, 20, 50, 100], // 每页数据量数组
          size: 20, // 每页数据量
          pagers: 5, // 页码列表 5-21默认7
          cur: 1, // 当前页
          single: false // 单页时是否隐藏
        }
      }
    },
    feedback: {
      // 用户体验反馈 => 'loading'-加载中， 'empty'-暂无数据,  'error'-获取数据失败
      type: String,
      default: ''
    },
    toolbar: {
      // 是否有工具栏
      type: Object,
      default: () => {
        return {
          show: {
            left: false,
            search: false,
            caption: false,
            right: false
          },
          label: {
            left: ['set', 'search', 'refresh', 'upload', 'download'],
            right: ['edit', 'delete', 'share', 'printer', 'lock']
          }
        }
      }
    },
    buttons: {
      // 是否有工具啦
      type: Object,
      default: () => {
        return {
          left: [
            {
              label: 'set',
              size: 'mini',
              icon: 'el-icon-setting',
              event: 'btn-set',
              param: null,
              tip: '设置'
            },
            {
              label: 'search',
              size: 'mini',
              icon: 'el-icon-search',
              event: 'btn-search',
              param: null,
              tip: '搜索'
            },
            {
              label: 'refresh',
              size: 'mini',
              icon: 'el-icon-refresh',
              event: 'btn-refresh',
              param: null,
              tip: '刷新'
            },
            {
              label: 'upload',
              size: 'mini',
              icon: 'el-icon-upload2',
              event: 'btn-upload',
              param: null,
              tip: '上传'
            },
            {
              label: 'download',
              size: 'mini',
              icon: 'el-icon-download',
              event: 'btn-download',
              param: null,
              tip: '下载'
            }
          ],
          right: [
            {
              label: 'edit',
              size: 'mini',
              icon: 'el-icon-edit',
              event: 'btn-edit',
              param: null,
              tip: '编辑'
            },
            {
              label: 'delete',
              size: 'mini',
              icon: 'el-icon-delete',
              event: 'btn-delete',
              param: null,
              tip: '删除'
            },
            {
              label: 'share',
              size: 'mini',
              icon: 'el-icon-share',
              event: 'btn-share',
              param: null,
              tip: '分享'
            },
            {
              label: 'printer',
              size: 'mini',
              icon: 'el-icon-printer',
              event: 'btn-printer',
              param: null,
              tip: '打印'
            },
            {
              label: 'lock',
              size: 'mini',
              icon: 'el-icon-lock',
              event: 'btn-lock',
              param: null,
              tip: '锁定'
            }
          ]
        }
      }
    },
    filters: {
      type: Array,
      default: () => {
        // return [{ prop: "ceJd" }, { prop: "ceDk" }];
        return []
      }
    },
    summary: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: String,
      default: ''
    },
    expands: {
      type: Object,
      default: () => {
        return {}
        // {
        //   expand: false, // 是否有展开行
        //   button: false, // 是否有按钮
        //   label: "操作",
        //   width: 100,
        //   align: "center",
        //   caption: "详情", // 按钮标题
        //   items: [{ id: 1, label: "展开行", value: "Table Expand Row" }] // 展开行项目
        //   // 【id】 => int（必填） => 字段ID
        //   // 【label】 => String（必填） => 字段名称
        //   // 【value】 => String（非必填） => 字段值
        // }
      }
    },
    fragment: {
      type: Object,
      default: () => {
        return {
          showHeader: true, // 是否显示表头
          showFooter: false, // 是否显示表尾
          showHeight: false, // 是否设置表格高度
          maxHeight: 500 // 表格最大高度
        }
      }
    },
    checkbox: {
      type: Boolean,
      default: true
    },
    btree: {
      type: Boolean,
      default: false
    },
    folder: {
      type: Boolean,
      default: true
    },
    indent: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      input: '',
      filterData: [],
      filterRows: [],
      placeholder: '',
      // width: 0,
      toggled: false,
      filtered: false,
      scrolled: false,
      scrollData: [],
      multipleSelection: []
    }
  },
  computed: {
    rowData: {
      get () {
        const _this = this
        if (_this.btree && !_this.filtered) {
          const data = _this.rows
          if (data && data.length === 0) {
            return []
          }

          addAttrs(data, { expand: !_this.folder })
          return (_this.filterRows = treeToArray(data))
        }

        if (_this.filtered) {
          return _this.filterData
        }

        if (_this.scrolled) {
          return _this.scrollData
        }

        return (_this.filterRows = _this.rows)
      },
      set (val) {
        return val
      }
    },
    colTree () {
      if (this.btree) {
        return this.cols[0]
      }
      return {}
    },
    colData () {
      const _this = this
      const tmp = []
      const cols = _this.cols
      // let width = 0
      _this.placeholder = '搜索:'
      cols.forEach((col, index) => {
        if (_this.btree && index > 0) {
          tmp.push(col)
        } else {
          tmp.push(col)
        }

        // if (_this.filters && _this.filters.indexOf(col.prop) !== -1) {
        //   _this.placeholder = _this.placeholder + "【" + col.label + "】";
        // }

        if (_this.filters && _this.filters.findIndex(item => item.prop === col.prop) !== -1) {
          _this.placeholder = _this.placeholder + '【' + col.label + '】'
        }

        // width += col.width
      })

      // _this.width = (width < 1230 ? 1230 : width) + 56;
      // _this.width =
      //   width +
      //   55 +
      //   (_this.btree ? _this.cols[0].width : 0) +
      //   (_this.expands && _this.expands.button ? _this.expands.width : 0)

      return tmp
    },
    propParams () {
      return Object.assign({
        page: Object.assign(
          {
            show: 0, // 显示 0 不显示 1 下方 2上方
            total: 0, // 数据量
            sizes: [10, 20, 50, 100], // 每页数据量数组
            size: 20, // 每页数据量
            pagers: 5, // 页码列表 5-21默认7
            cur: 1, // 当前页
            single: false // 单页时是否隐藏
          }, this.page),
        toolbar: Object.assign(
          {
            show: {
              left: false,
              search: false,
              caption: false,
              right: false
            },
            label: {
              left: ['set', 'search', 'refresh', 'upload', 'download'],
              right: ['edit', 'delete', 'share', 'printer', 'lock']
            }
          }, this.toolbar),
        buttons: Object.assign({
          left: [
            {
              label: 'set',
              size: 'mini',
              icon: 'el-icon-setting',
              event: 'btn-set',
              param: null,
              tip: '设置'
            },
            {
              label: 'search',
              size: 'mini',
              icon: 'el-icon-search',
              event: 'btn-search',
              param: null,
              tip: '搜索'
            },
            {
              label: 'refresh',
              size: 'mini',
              icon: 'el-icon-refresh',
              event: 'btn-refresh',
              param: null,
              tip: '刷新'
            },
            {
              label: 'upload',
              size: 'mini',
              icon: 'el-icon-upload2',
              event: 'btn-upload',
              param: null,
              tip: '上传'
            },
            {
              label: 'download',
              size: 'mini',
              icon: 'el-icon-download',
              event: 'btn-download',
              param: null,
              tip: '下载'
            }
          ],
          right: [
            {
              label: 'edit',
              size: 'mini',
              icon: 'el-icon-edit',
              event: 'btn-edit',
              param: null,
              tip: '编辑'
            },
            {
              label: 'delete',
              size: 'mini',
              icon: 'el-icon-delete',
              event: 'btn-delete',
              param: null,
              tip: '删除'
            },
            {
              label: 'share',
              size: 'mini',
              icon: 'el-icon-share',
              event: 'btn-share',
              param: null,
              tip: '分享'
            },
            {
              label: 'printer',
              size: 'mini',
              icon: 'el-icon-printer',
              event: 'btn-printer',
              param: null,
              tip: '打印'
            },
            {
              label: 'lock',
              size: 'mini',
              icon: 'el-icon-lock',
              event: 'btn-lock',
              param: null,
              tip: '锁定'
            }
          ]
        }, this.buttons),
        fragment: Object.assign(
          {
            showHeader: true, // 是否显示表头
            showFooter: false, // 是否显示表尾
            showHeight: false, // 是否设置表格高度
            maxHeight: 500 // 表格最大高度
          }, this.fragment)
      })
    }
  },
  methods: {
    // 操作
    handleRow (row, type) {
      const _this = this
      _this.toggled = true
      _this.$emit('handleRow', row, type)
    },
    // 排序
    handleSort ({ prop, order }) {
      this.$emit('handleSort', prop, order)
    },
    // 类名
    renderClass (target, renderList) {
      let myClass = ''
      let firstRender = false
      if (!renderList) return
      renderList.forEach(item => {
        if (!item.mode && item.myTarget === target) {
          if (firstRender) {
            myClass += ' ' + item.myClass
          } else {
            myClass += item.myClass
            firstRender = true
          }
        } else if (item.mode === 'more' && target > item.myTarget) {
          if (firstRender) {
            firstRender = true
            myClass += ' ' + item.myClass
          } else {
            myClass += item.myClass
            firstRender = true
          }
        } else if (item.mode === 'less' && target < item.myTarget) {
          if (firstRender) {
            myClass += ' ' + item.myClass
          } else {
            myClass += item.myClass
            firstRender = true
          }
        }
      })
      return myClass
    },
    // 切换每页数据量
    handleSize (value) {
      this.filtered = false
      this.$emit('handleSize', value)
    },
    // 切换页数
    handlePage (value) {
      this.filtered = false
      this.$emit('handlePage', value)
    },
    // 合计行
    handleSummary (param) {
      this.$emit('handlePage', param)
    },
    // 展开面板
    handleSpan (param) {
      this.$emit('handleSpan', param)
    },
    // 过滤行
    handleFilter (value, row, column) {
      this.$emit('handleFilter', value, row, column)
    },
    // 监听输入框
    handleInput (value) {
      this.$emit('handleInput', value)
    },
    // 监听输入框失去焦点
    handleBlur (value) {
      this.$emit('handleBlur', value)
    },
    // 监听输入框获取焦点
    handleFocus (value) {
      this.$emit('handleFocus', value)
    },
    // 展开行
    toggleExpand (row) {
      const _this = this
      if (row.expands && row.expands.length > 0 && !_this.toggled) {
        const $table = _this.$refs.table
        _this.rows.map(item => {
          if (row.id !== item.id) {
            $table.toggleRowExpansion(item, false)
          }
        })
        $table.toggleRowExpansion(row)
      }

      _this.toggled = false
    },
    // 操作
    handleItem (item, type) {
      this.$emit('handleItem', item, type)
    },
    // 折叠行
    toggleFold (row) {
      if (row.expands && row.expands.length > 0) {
        const $table = this.$refs.table
        $table.toggleRowExpansion(row.data, false)
      }
    },
    // 设置行样式
    rowStyle: function ({ row }) {
      const parent = row._parent
      const show = parent ? parent._expand && parent._show : true
      row._show = show

      let styleJson = {}
      if (show) {
        styleJson = {
          animation: 'el-table-tree-show 1s',
          '-webkit-animation': 'el-table-tree-show 1s'
        }
      } else {
        styleJson = {
          display: 'none'
        }
      }

      return styleJson
    },
    // 设置行样式
    headerStyle: function () {
      return {
        textAlign: 'center'
      }
    },
    // 显示表格树图标
    showTreeIcon (row) {
      return row._icon
    },
    // 表格树图标事件
    toggleTreeIcon (row) {
      this.toggled = true
      row._expand = !row._expand
    },
    // 多选框事件
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('selectCheckbox', this.multipleSelection)
    },
    // 监听滚动条事件
    handleScroll () {
      const $table = this.$refs.table.bodyWrapper
      // 滚动的长度
      var scrollTop = $table.scrollTop
      // 可视区的高度
      var clientHeight = $table.clientHeight
      // 滚动条的总高度
      var scrollHeight = $table.scrollHeight

      // 滚动条到底部的条件
      if (scrollTop + clientHeight === scrollHeight) {
        // 获取到的不是全部数据 当滚动到底部 继续获取新的数据

        console.log('scrollTop', scrollTop, 'clientHeight', clientHeight, 'scrollHeight', scrollHeight)

        this.scrolled = true
        this.scrollData = this.filterRows.slice(this.page.size - 20, this.page.size)
      }

      this.$emit('handleScroll')
    }
  },
  watch: {
    // computed/watch
    // eslint-disable-next-line no-unused-vars
    input: function (val, oldVal) {
      const _this = this

      if (val === oldVal || val.length === 0) {
        _this.filtered = false
      } else {
        _this.filterData = _this.filterRows.filter(item => {
          // return ~item.ceJd.indexOf(val);
          let ret = false
          for (let i = 0; i < _this.filters.length; i++) {
            const col = _this.filters[i].prop
            const _ret = item[col].toString().includes(val)
            ret = ret || _ret
          }

          _this.filtered = true
          return ret
        })
      }
    }
  },
  mounted () {
    // 组件挂载后添加监听事件监听滚动条
    if (this.scrolled) {
      document.addEventListener('scroll', this.handleScroll, true)
    }
  },
  destroy () {
    this.beforeDestroy()
  },
  beforeDestroy () {
    if (this.scrolled) {
      document.removeEventListener('scroll', this.handleScroll)
    }
  }
}
</script>

<style lang="stylus" scoped>
  //scss/less /deep/**
  //stylus >>>**
  .flex-page-table-container >>> {
    flex-display();
    flex-direction(column);
    flex-justify-content(flex-start);
    white-space: nowrap;
    overflow: hidden;
    .flex-page-table-toolbar {
      flex-display();
      flex-align-items(center);
      flex(0 0 30px);
      background-color: $white;
      color: $gray-black;
      .flex-page-table-toolbar-left {
        flex(1);
        background-color: $white;
        color: $gray-black;
      }
      .flex-page-table-toolbar-search {
        flex(0 0 50%);
        background-color: $white;
        color: $gray-black;
      }
      .flex-page-table-toolbar-caption {
        flex-display();
        flex-justify-content(center);
        flex(1);
        background-color: $white;
        color: $gray-black;
        font-size: 20px;
        font-family: "Microsoft YaHei UI";
        font-weight: bold;
      }
      .flex-page-table-toolbar-right {
        flex-display();
        flex-justify-content(right);
        flex(1);
        background-color: $white;
        color: $gray-black;
      }
    }
    .flex-page-table-content {
      flex(1);
      background-color: $white;
      color: $gray-black;
        &.el-table {
          z-index: 2000;
          //表格边框颜色,右边框要比左边框宽，下边框要比上边框高
          border: 1px solid $grey;
          //border-top: 1px solid #4e73ac;
          //border-left: 1px solid #4e73ac;
          //表格头部样式
          .el-table__header-wrapper tr th {
            background-color: $grey-white;
            color: $grey;
          }
          //表格每行样式
          .el-table__row {
            background-color: $white;
            color: $gray-black;
          }
          //表格每行hover样式
          .el-table__body tr.current-row > td {
            background-color: $white;
            color: $gray-black;
          }
          .el-table__body tr:hover > td {
            background-color: $gray-white;
            color: $gray;
          }
          //表格每行边框的样式
          td, th.is-leaf {
            border-bottom: 1px solid $gray-white;
            border-right: 1px solid $gray-white;
          }
          //表格每行的高度
          .el-table__header tr, .el-table__header th {
            height: 50px;
            padding: 0;
          }
          .el-table__body tr, .el-table__body td {
            height: 40px;
            padding: 0;
          }
          //表格每行第一列内容位置
          .el-table__header th:first-child .cell {
            padding-left: 20px;
          }
          .el-table__body td:first-child .cell {
            padding-left: 20px;
          }
          .el-table--border::after, .el-table--group::after {
            width: 0;
          }
          .el-table::before {
            height: 0;
          }
          //表头滚动条
          .el-table__header-wrapper {
            width: var(--layout-width);
            overflow-x: hide;
          }
          //表格滚动条
          .el-table__body-wrapper {
            overflow: scroll;
            width: var(--layout-width);
            height: var(--layout-height);
          }
          //定义滚动条宽高
          .el-table__body-wrapper::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          //定义滚动条里面的中间条颜色
          .el-table__body-wrapper::-webkit-scrollbar-thumb {
            background-color: $gray-white;
            border-radius: 4px;
            transition: background 0.4s;
          }
          .el-table__body-wrapper::-webkit-scrollbar-thumb:hover {
            background: $gray;
          }
          //定义滚动条轨道 内阴影+圆角,包裹中间条的地方
          .el-table__body-wrapper::-webkit-scrollbar-track {
            width: 8px;
            height: 8px;
            background-color: transparent;
          }
          //表格排序图标位置
          .caret-wrapper {
            height: 19px;
          }
          .sort-caret.ascending {
            top: -3px;
          }
          .sort-caret.descending {
            bottom: 0;
          }
          .el-button--text {
            font-size: 12px;
            color: #60c0bd;
          }
          .el-button--primary, .el-button--primary.is-round {
            padding: 1;
            margin-left: 1px
          }
          //表格展开样式
          .el-table-expand {
            font-size: 0;
            margin-left: 200px;
            label {
              width: 200px;
              color: #1e9fff !important;
            }
            .el-form-item {
              span {
                width: 200px;
                text-align: left;
                display: inline-block;
              }
              .el-button {
                width: 60px
              }
            }
          }
          .el-table__expand-icon {
            border: 1px solid #e7e7e7;
            padding: 1px;
          }
          .el-table__expand-icon--expanded {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          //表格树形图标样式
          .el-table-tree-icon {
            cursor: pointer;
            color: #2196f3;
          }
          @keyframes el-table-tree-show {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @-webkit-keyframes el-table-tree-show {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .el-icon-plus:before {
            //content: "\e6d9" !important; // el-icon-plus
            //content: "\e791" !important; // el-icon-caret-right
            //content: "\e6dc" !important; //el-icon-d-arrow-right
            content: "\e6e0" !important; // el-icon-arrow-right
            border: 1px solid #ccc;
            padding: 2px;
          }
          .el-icon-minus:before {
            //content: "\e6d8" !important; // el-icon-minus
            //content: "\e790" !important; // el-icon-caret-bottom
            //content: "\e6dd" !important; //el-icon-d-arrow-left
            content: "\e6df" !important; // el-icon-arrow-down
            border: 1px solid #ccc;
            padding: 2px;
          }
       }
    }
    .flex-page-table-feedback {
      flex(0 0 40px);
      background-color: $white;
      color: $gray-black;
      min-height: 60px;
      margin-top: 10px;
      .feedback {
        height: 60px;
        line-height: 60px;
        /*position: absolute;*/
        top: 40px;
        width: 100%;
        text-align: center;
      }
      .feedback i {
        font-size: 20px;
      }
      .feedback span {
        font-size: 14px;
        color: #909399;
      }
    }
    .flex-page-table-pagination {
      flex-display();
      flex-align-items(center);
      flex(0 0 40px);
      background-color: $white;
      color: $gray-black;
      .el-pagination__total {
        flex(1);
        background-color: $white;
        color: $gray-black;
      }
      .el-pagination__slot {
        flex(1);
        background-color: $white;
        color: $gray-black;
      }
      .el-pagination__sizes {
        flex-display();
        flex-justify-content(flex-end);
        flex(1);
        background-color: $white;
        color: $gray-black;
      }
      .btn-prev {
        background-color: $white;
        color: $gray-black;
      }
      .el-pager {
        background-color: $white;
        color: $gray-black;
      }
      .btn-next {
        background-color: $white;
        color: $gray-black;
      }
      .el-pagination__jump {
        background-color: $white;
        color: $gray-black;
      }
    }
  }
</style>
