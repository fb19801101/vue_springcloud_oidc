<template>
  <el-tabs v-model="tabPaneName" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane
      v-for="(item, index) in tabPaneTags"
      :key="index"
      :label="item.title"
      :name="item.name">
      <router-view name="TabPage"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'LayoutPage',
  data () {
    return {
    }
  },
  computed: {
    tabPaneName: {
      get: function () {
        return this.$store.state.tabPaneName
      },
      set: function (val) {
        this.$store.state.tabPaneName = val
      }
    },
    tabPaneTags () {
      return this.$store.state.tabPaneTags
    },
    activeTitle () {
      return this.$store.state.tabPaneTitle
    }
  },
  watch: {
    activeTitle: function () {
      this.addTab(this.$store.state.tabPaneTitle)
      this.toPage(this.$store.state.tabPaneTitle)
    }
  },
  methods: {
    addTab (title) {
      let isUpdate = true
      const tags = this.$store.state.tabPaneTags
      for (let i = 0; i < tags.length; i++) {
        if (tags[i].title === title) {
          this.$store.commit('updateLabelTabName', tags[i].name)
          isUpdate = false
        }
      }
      if (isUpdate) {
        const _index = this.$store.state.tabPaneIndex + 1
        tags.push({
          title: title,
          name: _index + ''
        })

        this.$store.commit('updateLabelTabName', _index + '')
        this.$store.commit('updateLabelTabsIndex', _index)
        this.$store.commit('updateLabelTabs', tags)
      }
    },
    removeTab (name) {
      if (name !== 'home') {
        let tags = this.$store.state.tabPaneTags
        let _name = this.$store.state.tabPaneName
        if (_name === name) {
          let _tag = {}
          tags.forEach((tag, index) => {
            if (tag.name === name) {
              _tag = tags[index + 1] || tags[index - 1]
              if (_tag) {
                _name = _tag.name
              }
            }
          })
          this.toPage(_tag.title)
        }

        this.$store.commit('updateLabelTabName', _name)
        tags = tags.filter(tag => tag.name !== name)
        this.$store.commit('updateLabelTabs', tags)
      }
    },
    clickTab (tag) {
      this.$store.commit('updateTitle', tag.label)
    },
    toPage (title) {
      this.$store.commit('updateTitle', title)
      switch (title) {
        case '首页':
          this.$router.replace('/demo/home')
          break
        case '网页端页面':
          this.$router.replace('/demo/browser/web')
          break
        case '移动端页面':
          this.$router.replace('/demo/browser/app')
          break
        case '授权管理':
          this.$router.replace('/demo/system/auth')
          break
        case '系统日志':
          this.$router.replace('/demo/system/log')
          break
        case '授权查询':
          this.$router.replace('/demo/query/auth')
          break
        case '岗位变化查询':
          this.$router.replace('/demo/query/post/change')
          break
        case '组织删除查询':
          this.$router.replace('/demo/query/org/delete')
          break
        case '网络计算参数':
          this.$router.replace('/demo/plan/params')
          break
        case '静态网络计算':
          this.$router.replace('/demo/plan/static')
          break
        case '动态网络计算':
          this.$router.replace('/demo/plan/estimate')
          break
        case '实际网络计算':
          this.$router.replace('/demo/plan/actual')
          break
        case '树形网络计划':
          this.$router.replace('/demo/plan/tree')
          break
        case 'API注册信息':
          this.$router.replace('/demo/api/holder')
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
