<script>
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
  asyncData({env, app}) {
    return {}
  },
  data() {
    return {
      columns: ['id', 'name', 'age'],
      data: [
        {id: 1, name: 'John', age: '20'},
        {id: 2, name: 'Jane', age: '24'},
        {id: 3, name: 'Susan', age: '16'},
        {id: 4, name: 'Chris', age: '55'},
        {id: 5, name: 'Dan', age: '40'},
      ],
      options: {
        // see the options API
      },
    }
  },
})
</script>

<template>
  <div id="people">
    <v-client-table :data="data" :columns="columns" :options="options" />
  </div>
</template>
