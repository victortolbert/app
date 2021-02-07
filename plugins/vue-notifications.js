import Vue from 'vue'

import VueNotifications from 'vue-notifications'

// Include mini-toaster (or any other UI-notification library)
// import miniToastr from 'mini-toastr'

// import iziToast from 'izitoast' // https://github.com/dolce/iziToast
// import 'izitoast/dist/css/iziToast.min.css'

import swal from 'sweetalert' // https://github.com/t4t5/sweetalert

// We shall setup types of the messages. ('error' type - red and 'success' - green in mini-toastr)
// const toastTypes = {
//   success: 'success',
//   error: 'error',
//   info: 'info',
//   warn: 'warn',
// }
// miniToastr.init({types: toastTypes})

// Here we are seting up messages output to `mini-toastr`
// This mean that in case of 'success' message we will call miniToastr.success(message, title, timeout, cb)
// In case of 'error' we will call miniToastr.error(message, title, timeout, cb)
// and etc.
// function toast({title, message, type, timeout, cb}) {
//   return miniToastr[type](message, title, timeout, cb)
// }

// function toast({title, message, type, timeout, cb}) {
//   if (type === VueNotifications.types.warn) type = 'warning'
//   return iziToast[type]({
//     title,
//     message,
//     timeout,
//     position: 'topRight',
//   })
// }

function toast({title, message, type, timeout, cb}) {
  if (type === VueNotifications.types.warn) type = 'warning'
  return swal(title, message, type)
}

// Here we map vue-notifications method to function abowe (to mini-toastr)
// By default vue-notifications can have 4 methods: 'success', 'error', 'info' and 'warn'
// But you can specify whatever methods you want.
// If you won't specify some method here, output would be sent to the browser's console
const options = {
  success: toast,
  error: toast,
  info: toast,
  warn: toast,
}

// Activate plugin
// VueNotifications have auto install but if we want to specify options we've got to do it manually.
Vue.use(VueNotifications, options)
