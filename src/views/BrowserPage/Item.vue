<template>
  <!-- 显示的数据源 -->
  <div>
    <div v-for="(index, item) in source.items" :key="index">
      <span>{{ index }}</span>
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item-component',
  props: {
    index: {
      // index of current item
      type: Number
    },
    source: {
      // here is: {id: '1', name: 'abc'}
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>
