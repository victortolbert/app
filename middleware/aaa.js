import {defineNuxtMiddleware} from '@nuxtjs/composition-api'

export default defineNuxtMiddleware(ctx => {
  // do stuff
  ctx.store.commit('ui/SET_BODY_CLASS', route.name)
})
