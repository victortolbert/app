export default function ({$auth, redirect, store}) {
  const user = $auth.state.user

  if (user && user.admin) {
    // let them in
  } else {
    store.dispatch('snackbar/setSnackbar', {
      color: 'error',
      text: 'You must be an admin to view that page',
    })
    redirect('/')
  }
}
