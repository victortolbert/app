<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  mounted() {
    // var ui = new firebaseui.auth.AuthUI(firebase.auth())
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth())
    }
    var uiConfig = {
      // signInFlow: 'popup',
      signInSuccessUrl: '/profile',
      signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  },
}
</script>

<template>
  <section id="firebaseui-auth-container"></section>
</template>
