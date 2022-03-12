<template>
  <el-collapse v-model="activeName" @change="handleChange" accordion>
    <el-collapse-item name="authManage" :disabled="false">
      <template slot="title">
        <span class="box-margin-left-10">权限设置</span>
        <i class="el-icon-info box-margin-left-10"></i>
      </template>
      <div>甘忠忠：股份公司/十二局集团</div>
      <div>甘忠忠：股份公司/十一局集团</div>
    </el-collapse-item>
    <el-collapse-item name="postChange" :disabled="false">
      <template slot="title">
        <span class="box-margin-left-10">岗位变化</span>
        <i class="el-icon-info box-margin-left-10"></i>
      </template>
      <div>甘忠忠：股份公司/十二局集团/部长/甘忠忠</div>
      <div>原岗位：股份公司/十二局集团/部员/甘忠忠</div>
    </el-collapse-item>
    <el-collapse-item name="orgDelete" :disabled="false">
      <template slot="title">
        <span class="box-margin-left-10">组织删除</span>
        <i class="el-icon-info box-margin-left-10"></i>
      </template>
      <div>十二局一公司：股份公司/十二局集团/十二局集团一公司</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>

import Variables from '@/styles/variables.scss'

export default {
  name: 'NavigationPresses',
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
      console.log(val)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-collapse {
    width: $sideBarWidth - 10px !important;
    margin-left: 5px !important;
  }

  .el-collapse >>> .el-collapse-item {
    background-color: $menuColor !important;
  }

  .el-collapse >>> .el-collapse-item__header {
    background-color: $white !important;
    border-bottom: 1px solid $gray-white !important;
    font-size: 14px !important;
    font-weight: 700 !important;
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
