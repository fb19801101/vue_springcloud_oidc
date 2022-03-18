<template>
  <div>
    <router-view name="TabPaneChild"/>
  </div>
</template>

<script>

export default {
  name: 'LayoutChild',
  data () {
    return {
    }
  },
  computed: {
    routedViews () {
      return this.$store.state.routedViews
    }
  },
  watch: {
    tabPaneName: function () {
      this.toPage(this.$store.state.tabPaneName)
    }
  },
  methods: {
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
</style>
