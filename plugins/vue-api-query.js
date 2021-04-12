import { Model } from 'vue-api-query'

export default function ({$axios}, inject) {
  Model.$http = $axios
}
