import Vue from 'vue'
import vSelect from 'vue-select'

// import 'vue-select/dist/vue-select.css'
// @import "vue-select/src/scss/vue-select.scss";

vSelect.props.components.default = () => ({
  // Deselect: {
  //   render: createElement => createElement('span', '❌'),
  // },
  // OpenIndicator: {
  //   render: createElement => createElement('span', '🔽'),
  // },
})

Vue.component('VSelect', vSelect)
