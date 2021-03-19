export default ({store, redirect}) => {
  if (!store.state.authenticated) {
    return redirect('/login')
  }
}

// export default function ({store}) {
//   store.app.router.beforeEach((to, from, next) => {
//     if (confirm('Are you sure?')) {
//       next()
//     } else {
//       next(false)
//     }
//   })
// }

// export default function ({store}) {
//   let setup = false
//   if (!setup) {
//     store.app.router.beforeEach((to, from, next) => {
//       setup = true
//       if (confirm('Are you sure?')) {
//         next()
//       } else {
//         next(false)
//       }
//     })
//   }
// }
