<template>
  <el-collapse v-model="activeName" @change="handleChange" accordion>
    <el-collapse-item name="网络计算参数" :disabled="false">
      <template slot="title">
        <span class="box-margin-left-10">网络计算参数</span>
        <i class="el-icon-s-open box-margin-left-10"></i>
      </template>
      <div>甘忠忠：股份公司/十二局集团</div>
      <div>甘忠忠：股份公司/十一局集团</div>
    </el-collapse-item>
    <el-collapse-item name="静态网络计算" :disabled="false">
      <template slot="title">
        <span class="box-margin-left-10">静态网络计算</span>
        <i class="el-icon-s-open box-margin-left-10"></i>
      </template>
      <div>甘忠忠：股份公司/十二局集团/部长/甘忠忠</div>
      <div>原岗位：股份公司/十二局集团/部员/甘忠忠</div>
    </el-collapse-item>
    <el-collapse-item name="组织人员浏览" :disabled="false">
      <template slot="title">
        <span class="box-margin-left-10">组织人员浏览</span>
        <i class="el-icon-s-open box-margin-left-10"></i>
      </template>
      <div>十二局一公司：股份公司/十二局集团/十二局集团一公司</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>

import Variables from '@/styles/variables.scss'

export default {
  name: 'NavigationTodoList',
  data () {
    return {
      activeName: ''
    }
  },
  created () {
  },
  computed: {
    variables () {
      return Variables
    }
  },
  watch: {},
  methods: {
    handleChange (val) {
      this.toPage(val)
    },
    toPage (val) {
      this.$store.dispatch('updateTabPaneTitle', val)
      switch (val) {
        case '网络计算参数':
          this.$router.replace('/demo/browser')
          break
        case '静态网络计算':
          this.$router.replace('/demo/planComputeParams')
          break
        case '组织人员浏览':
          this.$router.replace('/demo/planComputeStatic')
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-collapse {
    width: $sideBarWidth - 10px;
    margin-left: 5px;
  }

  .el-collapse >>> .el-collapse-item {
    background-color: $menuColor !important;
  }

  .el-collapse >>> .el-collapse-item__header {
    background-color: $white !important;
    border-bottom: 1px solid $gray-white !important;
    font-size: 14px;
    font-weight: 700;
    color: $gray-black !important;
  }

  .el-collapse >>> .el-collapse-item__header.is-active {
    border-bottom: transparent !important;
  }

  .el-collapse >>> .el-collapse-item__wrap {
    background-color: $white !important;
    border-bottom: 1px solid $gray-white !important;
  }

  .el-collapse >>> .el-collapse-item__content {
    color: $grey !important;
    text-align: left !important;
    margin: 0 5px 0 5px !important;
  }
</style>
