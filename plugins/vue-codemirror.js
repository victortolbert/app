import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
// codemirror language
import 'codemirror/mode/vue/vue.js'
// codemirror active-line.js
import 'codemirror/addon/selection/active-line.js'
// more codemirror resource...
import 'codemirror-theme-vars/base.css'

// you can set default global options and events when Vue.use
Vue.use(VueCodemirror, {
  options: {
    theme: 'vars',
  },
  events: ['scroll'],
})
