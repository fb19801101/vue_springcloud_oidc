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
        @select="handleSelect"
        v-for="(route, idx) in menuItems" :key="idx">
        <el-menu-item :index="route.name" :route="route.path" v-if="route.children == null && route.auth">
          <div class="box-center">
            <i :class="route.icon + ' box-right'" v-if="route.icon !== undefined"></i>
            <svg-icon :icon-class="route.svg" class-name="box-right" v-if="route.svg !== undefined"></svg-icon>
            <span class="box-left">{{route.title}}</span>
          </div>
        </el-menu-item>
        <el-submenu :index="route.name" v-if="route.children != null && route.auth" >
          <template slot="title">
            <div class="box-center">
              <i :class="route.icon + ' box-right'" v-if="route.icon !== undefined"></i>
              <svg-icon :icon-class="route.svg" class-name="box-right" v-if="route.svg !== undefined"></svg-icon>
              <span class="box-left">{{route.title}}</span>
            </div>
          </template>
          <el-menu-item :index="item.name" :route="route.path" v-for="(item, idx) in route.children" :key="idx">
            <div class="box-center">
              <i :class="item.icon + ' box-right'" v-if="item.icon !== undefined"></i>
              <svg-icon :icon-class="item.svg" class-name="box-right" v-if="item.svg !== undefined"></svg-icon>
              <span class="box-left">{{item.title}}</span>
            </div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>

import NavRouter from '@router/modules/nav'
import Variables from '@/styles/variables.scss'
import SvgIcon from '@/components/SvgIcon/SvgIcon'

export default {
  name: 'NavigationMenu',
  components: { SvgIcon },
  data () {
    return {
      none: 0,
      menuItems: []
    }
  },
  created () {
    NavRouter.forEach(route => {
      const path = '/demo/' + route.path
      let items = []
      if ('children' in route) {
        const children = [...route.children]
        children.forEach(route => {
          items.push({
            name: route.name,
            title: route.meta.title,
            auth: route.meta.auth,
            icon: route.meta.icon !== undefined ? route.meta.icon : undefined,
            svg: route.meta.svg !== undefined ? route.meta.svg : undefined,
            path: path + '/' + route.path,
            children: null
          })
        })
      } else {
        items = null
      }

      this.menuItems.push({
        name: route.name,
        title: route.meta.title,
        auth: route.meta.auth,
        icon: route.meta.icon !== undefined ? route.meta.icon : undefined,
        svg: route.meta.svg !== undefined ? route.meta.svg : undefined,
        path: path,
        children: items
      })
    })
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
      return this.$store.state.userAuth.browseWeb !== 0
    },
    showBrowserApp () {
      return this.$store.state.userAuth.browseApp !== 0
    },
    showSystemManage () {
      return this.showSystemQuery || this.showSystemAuth || this.showSystemLog
    },
    showSystemAuth () {
      return this.$store.state.userAuth.systemAuth !== 0
    },
    showSystemLog () {
      return this.$store.state.userAuth.systemLog !== 0
    },
    showSystemQuery () {
      return this.showQueryAuth || this.showQueryPostChange || this.showQueryOrgDelete
    },
    showQueryAuth () {
      return this.$store.state.userAuth.queryAuth !== 0
    },
    showQueryPostChange () {
      return this.$store.state.userAuth.queryPostChange !== 0
    },
    showQueryOrgDelete () {
      return this.$store.state.userAuth.queryOrgDelete !== 0
    },
    showPlanCompute () {
      return this.showPlanParams || this.showPlanStatic || this.showPlanEstimate || this.showPlanActual || this.showPlanTree
    },
    showPlanParams () {
      return this.$store.state.userAuth.planParams !== 0
    },
    showPlanStatic () {
      return this.$store.state.userAuth.planStatic !== 0
    },
    showPlanEstimate () {
      return this.$store.state.userAuth.planEstimate !== 0
    },
    showPlanActual () {
      return this.$store.state.userAuth.planActual !== 0
    },
    showPlanTree () {
      return this.$store.state.userAuth.planTree !== 0
    },
    showApiHolder () {
      return this.$store.state.userAuth.apiHolder !== 0
    }
  },
  watch: {},
  methods: {
    handleSelect (index) {
      this.$store.dispatch('updateTabPaneName', index)
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
    flex-display();
    flex-direction(column);
    flex-justify-content(space-between);
    height: 60vh;
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
