<template>
  <el-tabs ref="tabs" v-model="tabPaneName" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
    <el-tab-pane
      v-for="(item, index) in tabPaneTags"
      :key="index"
      :label="item.title"
      :name="item.name">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" name="TabPaneView" />
        </keep-alive>
      </transition>
    </el-tab-pane>
  </el-tabs>
</template>

<script>

export default {
  name: 'LayoutPage',
  props: {
    showTabPaneLabel: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  created () {
    if (this.$store.state.routedViews.length === 0) {
      const routes = this.$router.options.routes[2].children
      routes.forEach(route => {
        if ('children' in route) {
          const path = route.path
          const children = [...route.children]
          children.forEach(route => {
            route.path = path + '/' + route.path
            this.$store.dispatch('addRoutedView', route)
          })
        } else {
          this.$store.dispatch('addRoutedView', route)
        }
      })
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
    layoutDevice: {
      get: function () {
        return this.$store.state.layoutDevice
      },
      set: function (val) {
        this.$store.state.layoutDevice = val
      }
    },
    tabPaneTags: {
      get: function () {
        return this.$store.state.tabPaneTags
      },
      set: function (val) {
        this.$store.state.tabPaneTags = val
      }
    },
    routedViews: {
      get: function () {
        return this.$store.state.routedViews
      },
      set: function (val) {
        this.$store.state.routedViews = val
      }
    },
    cachedViews: {
      get: function () {
        return this.$store.state.cachedViews
      },
      set: function (val) {
        this.$store.state.cachedViews = val
      }
    },
    key: {
      get: function () {
        return this.$route.path
      }
    }
  },
  watch: {
    tabPaneName: function () {
      this.addTab(this.$store.state.tabPaneName)
      this.toPage(this.$store.state.tabPaneName)
    },
    layoutDevice: function () {
      this.$nextTick(() => {
        if (this.$store.state.layoutDevice === 'mobile') {
          this.$refs.tabs.$el.firstChild.style.display = 'none'
        } else {
          this.$refs.tabs.$el.firstChild.style.display = 'inline'
        }
      })
    }
  },
  methods: {
    addTab (name) {
      const tags = this.tabPaneTags.filter(tag => tag.name === name)
      const routes = this.routedViews.filter(route => route.name === name)
      if (tags.length === 0 && routes.length > 0) {
        const route = routes[0]
        this.$store.dispatch('addTabPaneTag', { title: route.meta.title, name: name, index: 0 })
        this.$store.dispatch('updateTabPaneTitle', route.meta.title)
        this.$store.dispatch('updateTabPaneName', name)
        this.$store.dispatch('updateTabPaneIndex', this.tabPaneTags.length)
        this.$store.dispatch('addCachedView', route)
      } else if (tags.length > 0) {
        const tag = tags[0]
        this.$store.dispatch('updateTabPaneTitle', tag.title)
        this.$store.dispatch('updateTabPaneName', name)
        this.$store.dispatch('updateTabPaneIndex', tag.index)
      }
    },
    removeTab (name) {
      const tags = this.tabPaneTags.filter(tag => tag.name === name)
      if (tags.length > 0) {
        const tag = tags[0]
        this.$store.dispatch('delTabPaneTag', tag)
        this.toPage(tag.name)

        this.$store.dispatch('updateTabPaneTitle', tag.title)
        this.$store.dispatch('updateTabPaneName', tag.name)
        this.$store.dispatch('updateTabPaneIndex', tag.index)
      }
    },
    clickTab (tag) {
      this.$store.dispatch('updateTabPaneTitle', tag.name)
    },
    toPage (name) {
      const routes = this.routedViews.filter(route => route.name === name)
      if (routes.length > 0) {
        const route = routes[0]
        if (this.$router.currentRoute.name !== route.name) {
          this.$router.push(route).catch(err => {
            console.log('输出错误', err)
          })
          // this.$router.replace('/demo/' + route.path).catch(err => {
          //   console.log('输出错误', err)
          // })
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  /*
  .el-tabs >>> .el-tabs__header {
    display: none
  }
  */
</style>
