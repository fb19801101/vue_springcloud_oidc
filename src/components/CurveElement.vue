<template>
  <div id="curve-element">
    <table>
      <caption>
        <h3>{{caption}}</h3>
      </caption>

      <thead>
        <tr>
          <th v-for="col in columns" :key="col.field" :width="col.width" >{{col.title}}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in rows" :key="row.id" >
          <td>{{row.id}}</td>
          <td v-for="item in row.items" :key="item.field">{{item.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'CurveElement',
  props: {
    caption: String,
    columns: Array,
    rows: Array
  }
}
</script>

<style lang="stylus">
  table {
    border-collapse: collapse;
    margin: 0 auto;
    text-align: center;
  }
  table td, table th {
    border: 1px solid #cad9ea;
    color: #666;
    height: 30px;
  }
  table thead th {
    background-color: #CCE8EB;
    /*width: 100px;*/
  }
  table tbody tr:nth-child(odd) {
    background: #fff;
  }
  table tbody tr:nth-child(even) {
    background: #F5FAFA;
  }
</style>
