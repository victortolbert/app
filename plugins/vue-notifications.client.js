import Vue from 'vue'
import VueNotifications from 'vue-notifications'
// import swal from 'sweetalert' // https://github.com/t4t5/sweetalert

import iziToast from 'izitoast' // https://github.com/dolce/iziToast
import 'izitoast/dist/css/iziToast.min.css'

function toast({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  // return swal(title, message, type)
  return iziToast[type]({title, message, timeout})
}

const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast,
}

Vue.use(VueNotifications, options)
