<template>
  <div class="flex-menu-container">
    <el-scrollbar class="flex-menu-scroll" :native = "false">
      <el-menu class="flex-menu-body"
        :default-active="defaultActive"
        :collapse="false"
        border-right="0"
        :background-color="variables.menuColor"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        @open="handleOpen"
        @select="handleSelect">
        <el-submenu index="组织人员浏览" v-if="showBrowserPage">
          <template slot="title">
            <div class="box-center">
              <i class="el-icon-user-solid box-right"></i>
              <span class="box-left">组织人员浏览</span>
            </div>
          </template>
          <el-menu-item index="网页端页面" v-if="showBrowserWeb">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">网页端页面</span>
            </div>
          </el-menu-item>
          <el-menu-item index="移动端页面" v-if="showBrowserApp">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">移动端页面</span>
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="系统管理" v-if="showSystemManage">
          <template slot="title">
            <div class="box-center">
              <i class="el-icon-setting box-right"></i>
              <span class="box-left">系统管理</span>
            </div>
          </template>
          <el-menu-item index="授权管理" v-if="showSystemAuth">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">授权管理</span>
            </div>
          </el-menu-item>
          <el-menu-item index="系统日志" v-if="showSystemLog">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">系统日志</span>
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="统计报表" v-if="showSystemQuery">
          <template slot="title">
            <div class="box-center">
              <i class="el-icon-menu box-right"></i>
              <span class="box-left">统计报表</span>
            </div>
          </template>
          <el-menu-item index="授权查询" v-if="showQueryAuth">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">授权查询</span>
            </div>
          </el-menu-item>
          <el-menu-item index="岗位变化查询" v-if="showQueryPostChange">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">岗位变化查询</span>
            </div>
          </el-menu-item>
          <el-menu-item index="组织删除查询" v-if="showQueryOrgDelete">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">组织删除查询</span>
            </div>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="网络计算管理" v-if="showPlanCompute">
          <template slot="title">
            <div class="box-center">
              <i class="el-icon-date box-right"></i>
              <span class="box-left">网络计算管理</span>
            </div>
          </template>
          <el-menu-item index="网络计算参数" v-if="showPlanParams">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">网络计算参数</span>
            </div>
          </el-menu-item>
          <el-menu-item index="静态网络计算" v-if="showPlanStatic">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">静态网络计算</span>
            </div>
          </el-menu-item>
          <el-menu-item index="动态网络计算" v-if="showPlanEstimate">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">动态网络计算</span>
            </div>
          </el-menu-item>
          <el-menu-item index="实际网络计算" v-if="showPlanActual">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">实际网络计算</span>
            </div>
          </el-menu-item>
          <el-menu-item index="树形网络计划" v-if="showPlanTree">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">树形网络计划</span>
            </div>
          </el-menu-item>
      </el-submenu>
        <el-submenu index="API注册管理" v-if="showApiHolder">
          <template slot="title">
            <div class="box-center">
              <i class="el-icon-help box-right"></i>
              <span class="box-left">API注册管理</span>
            </div>
          </template>
          <el-menu-item index="API注册信息" v-if="showApiHolder">
            <div class="box-center">
              <i class="el-icon-document box-right"></i>
              <span class="box-left">API注册信息</span>
            </div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>

import Variables from '@/styles/variables.scss'

export default {
  name: 'NavigationMenu',
  data () {
    return {
      none: 0
    }
  },
  created () {
  },
  computed: {
    variables () {
      return Variables
    },
    defaultActive () {
      return this.$store.state.tabPaneTitle
    },
    showBrowserPage () {
      return this.showBrowserWeb || this.showBrowserApp
    },
    showBrowserWeb () {
      return this.$store.state.browseWeb !== 0
    },
    showBrowserApp () {
      return this.$store.state.browseApp !== 0
    },
    showSystemManage () {
      return this.showSystemQuery || this.showSystemAuth || this.showSystemLog
    },
    showSystemAuth () {
      return this.$store.state.systemAuth !== 0
    },
    showSystemLog () {
      return this.$store.state.systemLog !== 0
    },
    showSystemQuery () {
      return this.showQueryAuth || this.showQueryPostChange || this.showQueryOrgDelete
    },
    showQueryAuth () {
      return this.$store.state.queryAuth !== 0
    },
    showQueryPostChange () {
      return this.$store.state.queryPostChange !== 0
    },
    showQueryOrgDelete () {
      return this.$store.state.queryOrgDelete !== 0
    },
    showPlanCompute () {
      return this.showPlanParams || this.showPlanStatic || this.showPlanEstimate ||
        this.showPlanActual || this.showPlanTree
    },
    showPlanParams () {
      return this.$store.state.planParams !== 0
    },
    showPlanStatic () {
      return this.$store.state.planStatic !== 0
    },
    showPlanEstimate () {
      return this.$store.state.planEstimate !== 0
    },
    showPlanActual () {
      return this.$store.state.planActual !== 0
    },
    showPlanTree () {
      return this.$store.state.planTree !== 0
    },
    showApiHolder () {
      return this.$store.state.apiHolder !== 0
    }
  },
  watch: {},
  methods: {
    handleSelect (title) {
      this.$store.commit('updateTitle', title)
    },
    // 鉴权函数
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .flex-menu-container >>> {
    margin-left: 5px;
    flex-display();
    flex-direction(column);
    flex-justify-content(space-between);
    height: calc(40vh);
    .flex-menu-scroll {
      flex(1);
      white-space: nowrap;
      overflow: hidden;
      .el-scrollbar__wrap {
        overflow: scroll;
        height: calc(100% + 17px);
        .el-scrollbar__view {
          .flex-menu-body {
            width: 100%
            &.el-menu {
              border: none;
              width: $sideBarWidth;
              max-height: calc(100vh - 100px);
              .el-menu-item, .el-submenu {
                //border: 1px solid $menuText;
                width: $sideBarWidth;
              }

              .el-menu-item i, .el-submenu i {
                color: $menuText;
                //border: 1px solid $menuText;
                width: 40px;
              }

              .el-menu-item span, .el-submenu span {
                color: $menuText;
                //border: 1px solid $menuText;
                width: $sideBarWidth - 40px;
              }

              .el-submenu>.el-submenu__title.el-submenu__title .el-submenu__icon-arrow{
                color: $menuText;
                //border: 1px solid $menuText;
                width: 20px;
              }

              .el-submenu.is-opened>.el-submenu__title.el-submenu__title .el-submenu__icon-arrow{
                color: $menuText;
                //border: 1px solid $menuText;
                width: 20px;
              }
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
          width: 8px;
          background-color: transparent;
        }
      }
      //定义滚动条里面的中间条颜色
      .el-scrollbar__thumb {
        background-color: $gray-white;
        border-radius: 4px;
        transition: background 0.4s;
      }
      .el-scrollbar__thumb:hover {
        background: $grey;
      }
    }
  }
</style>
