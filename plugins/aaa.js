import {defineNuxtPlugin, onGlobalSetup, provide} from '@nuxtjs/composition-api'

export default defineNuxtPlugin(ctx => {
  onGlobalSetup(() => {
    provide('globalKey', true)
  })
})
