import Vue from 'vue'

import {RayPlugin} from 'vue-ray/vue2'

Vue.use(RayPlugin, {
  interceptErrors: true,
  host: '127.0.0.1',
  showComponentEvents: ['mounted'],
})
