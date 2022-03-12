<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
  /*#app*/
  /*  font-family Avenir, Helvetica, Arial, sans-serif*/
  /*  -webkit-font-smoothing antialiased*/
  /*  -moz-osx-font-smoothing grayscale*/
  /*  text-align center*/
  /*  color #2c3e50*/
  // el-pagination__sizes
  .sizes-options {
    z-index: 10001 !important;
    .el-select-dropdown__item.selected{
      color: $light-blue;
    }
    .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
      background-color: $grey-white;
      color: $grey;
    }
  }
</style>
