import Vue from 'vue'

import {library, config, dom} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {fad} from '@fortawesome/pro-duotone-svg-icons'
import {fal} from '@fortawesome/pro-light-svg-icons'
import {far} from '@fortawesome/pro-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

config.autoAddCss = false

library.add(fas)
library.add(fab)
library.add(fad)
library.add(far)
library.add(fal)

dom.watch()

// const css = dom.css()
// dom.insertCss(css)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
