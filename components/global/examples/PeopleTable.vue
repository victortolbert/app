<template>
  <div id="people">
    <v-client-table :data="tableData" :columns="columns" :options="options" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: ['id', 'name', 'age'],
      tableData: [
        {id: 1, name: 'John', age: '20'},
        {id: 2, name: 'Jane', age: '24'},
        {id: 3, name: 'Susan', age: '16'},
        {id: 4, name: 'Chris', age: '55'},
        {id: 5, name: 'Dan', age: '40'},
      ],
      options: {},
    }
  },
  async mounted() {
    // this.$refs.myTable.setLoadingState(true)
    // const {data} = await axios.get('api/data')
    // this.data = data
    // this.$refs.myTable.setLoadingState(false)
  },
}
</script>
