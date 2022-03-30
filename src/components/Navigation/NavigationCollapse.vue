<template>
  <div class="flex-collapse-container">
    <el-scrollbar class="flex-collapse-scroll" :native = "false">
      <el-collapse class="flex-collapse-body" @change="handleChange" accordion>
        <el-collapse-item
          v-for="(item, index) in items"
          :key="index"
          :name="item.name"
          :disabled="item.disabled">
          <template slot="title">
            <span class="box-margin-left-10">{{item.title}}</span>
            <i :class="item.icon + ' box-margin-left-10'" v-if="item.icon !== undefined"></i>
            <svg-icon :icon-class="item.svg" class-name="box-margin-left-10" v-if="item.svg !== undefined"></svg-icon>
          </template>
          <div v-for="(text, key) in item.content" :key="key">{{text}}</div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script>

import SvgIcon from '@/components/SvgIcon/SvgIcon'

export default {
  name: 'NavigationCollapse',
  components: { SvgIcon },
  props: {
    // [
    //   { name: 'PlanParams',
    //     title: '网络计算参数',
    //     icon: 'el-icon-info', // element icon
    //     svg: '', // svg icon
    //     content: ['甘忠忠：股份公司/十二局集团', '薛朝阳：股份公司/十一局集团'],
    //     disabled: false },
    //   { name: 'ApiHolder',
    //     title: 'API注册信息',
    //     icon: 'el-icon-info', // element icon
    //     svg: '', // svg icon
    //     content: ['甘忠忠：股份公司/十二局集团/部长/甘忠忠', '原岗位：股份公司/十二局集团/部员/甘忠忠'],
    //     disabled: false },
    //   { name: 'BrowserWeb',
    //     title: '网页端页面',
    //     icon: 'el-icon-info', // element icon
    //     svg: '', // svg icon
    //     content: ['十二局一公司：股份公司/十二局集团/十二局集团一公司'],
    //     disabled: false }
    // ]
    items: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleChange (name) {
      this.$store.dispatch('updateTabPaneName', name)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .flex-collapse-container >>> {
    flex-display();
    flex-direction(column);
    flex-justify-content(space-between);
    height: calc(40vh - 170px);
    .flex-collapse-scroll {
      flex(1);
      white-space: nowrap;
      overflow: hidden;
      .el-scrollbar__wrap {
        overflow: scroll;
        height: calc(100% + 17px);
        .el-scrollbar__view {
          .flex-collapse-body {
            width: 100%
            &.el-collapse {
              width: $sideBarWidth - 10px;
              margin-left: 5px;
              .el-collapse-item {
                background-color: $menuColor !important;
              }
              .el-collapse-item__header {
                background-color: $white !important;
                border-bottom: 1px solid $gray-white !important;
                font-size: 14px;
                font-weight: 700;
                color: $gray-black !important;
              }
              .el-collapse-item__header.is-active {
                border-bottom: transparent !important;
              }
              .el-collapse-item__wrap {
                background-color: $grey-white !important;
                border-bottom: 1px solid $gray-white !important;
              }
              .el-collapse-item__content {
                color: $grey !important;
                text-align: left !important;
                margin: 0 5px 0 5px !important;
              }
              i, svg {
                cursor: pointer
                color: $black
              }
              i:hover, svg:hover {
                background: $white;
                opacity: 1;
                color: $light-blue
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
