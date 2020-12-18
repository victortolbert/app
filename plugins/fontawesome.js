import Vue from 'vue'

import {library, dom} from '@fortawesome/fontawesome-svg-core'

// Brands (fab)
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook'
import {faFacebookF} from '@fortawesome/free-brands-svg-icons/faFacebookF'
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons/faFacebookSquare'
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter'

// Regular (far)
import {faArrowCircleRight} from '@fortawesome/pro-regular-svg-icons/faArrowCircleRight'
import {faBars as farBars} from '@fortawesome/pro-regular-svg-icons/faBars'
import {faChevronRight as farChevronRight} from '@fortawesome/pro-regular-svg-icons/faChevronRight'
import {faCommentAltLines} from '@fortawesome/pro-regular-svg-icons/faCommentAltLines'
import {faEdit} from '@fortawesome/pro-regular-svg-icons/faEdit'
import {faEnvelope} from '@fortawesome/pro-regular-svg-icons/faEnvelope'
import {faExternalLinkSquare} from '@fortawesome/pro-regular-svg-icons/faExternalLinkSquare'
import {faTimes as farTimes} from '@fortawesome/pro-regular-svg-icons/faTimes'
import {faUserEdit as farUserEdit} from '@fortawesome/pro-regular-svg-icons/faUserEdit'

// Light (fal)
import {faBars} from '@fortawesome/pro-light-svg-icons/faBars'
import {faTimes} from '@fortawesome/pro-light-svg-icons/faTimes'
import {faUserEdit} from '@fortawesome/pro-light-svg-icons/faUserEdit'

// Solid Style Icons (fas)
import {faBold} from '@fortawesome/free-solid-svg-icons/faBold'
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons/faChevronDown'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight'
import {faChevronUp} from '@fortawesome/free-solid-svg-icons/faChevronUp'
import {faCog} from '@fortawesome/free-solid-svg-icons/faCog'
import {faComment} from '@fortawesome/free-solid-svg-icons/faComment'
import {faEdit as fasEdit} from '@fortawesome/free-solid-svg-icons/faEdit'
import {faEnvelope as fasEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope'
import {faExpandArrowsAlt} from '@fortawesome/free-solid-svg-icons/faExpandArrowsAlt'
import {faItalic} from '@fortawesome/free-solid-svg-icons/faItalic'
import {faLink} from '@fortawesome/free-solid-svg-icons/faLink'
import {faMinus} from '@fortawesome/free-solid-svg-icons/faMinus'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons/faPlayCircle'
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus'
import {faRedo} from '@fortawesome/free-solid-svg-icons/faRedo'
import {faTimes as fasTimes} from '@fortawesome/free-solid-svg-icons/faTimes'
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt'
import {faUnderline} from '@fortawesome/free-solid-svg-icons/faUnderline'
import {faUndo} from '@fortawesome/free-solid-svg-icons/faUndo'

// Import Font Awesome components
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome'

library.add(
  faArrowCircleRight,
  faBars,
  faBold,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  farChevronRight,
  faCog,
  faComment,
  faCommentAltLines,
  faEdit,
  fasEdit,
  faEnvelope,
  fasEnvelope,
  faExpandArrowsAlt,
  faExternalLinkSquare,
  faFacebook,
  faFacebookF,
  faFacebookSquare,
  faItalic,
  faLink,
  faMinus,
  faPlayCircle,
  faPlus,
  faRedo,
  farBars,
  farTimes,
  fasTimes,
  faTimes,
  faTrashAlt,
  faTwitter,
  faUnderline,
  faUndo,
  faUserEdit,
  farUserEdit,
)

dom.watch()

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.component('FontAwesomeLayers', FontAwesomeLayers)
Vue.component('FontAwesomeLayersText', FontAwesomeLayersText)
