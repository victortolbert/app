import Vue from 'vue'
import Oruga from '@oruga-ui/oruga'

Vue.use(Oruga, {
  "includeCss": "vars",
  "iconPack": "fas",
  "iconComponent": "FontAwesomeIcon",
  "button": {
    "override": true,
    "rootClass": "border rounded-md py-1 px-4 hover:bg-gray-100",
    "variantClass": "is-"
  }
})