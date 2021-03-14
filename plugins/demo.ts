import {Plugin} from '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    $demo(message: string): void
  }
}

const demo: Plugin = context => {
  context.$demo = (message: string) => {
    console.log(message)
  }
}

export default demo
