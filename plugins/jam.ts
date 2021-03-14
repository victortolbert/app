import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $jam(message: string): void
  }
}

Vue.prototype.$jam = (message: string) => console.log(message)
