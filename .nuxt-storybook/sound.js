import { useSound } from '@vueuse/sound'
import defu from 'defu'
import appOptions from './sound.config'

const options = defu(appOptions, {
  "back": {
    "src": "/assets/sound/back.wav",
    "options": {
      "volume": 0.25
    }
  },
  "button": {
    "src": "/assets/sound/button.wav",
    "options": {
      "volume": 0.25
    }
  },
  "error": {
    "src": "/assets/sound/error.wav",
    "options": {
      "volume": 0.25
    }
  }
})

/**
 * @type {import('@nuxt/types').Plugin}
 */
export default async ({ app }, inject) => {
  const $sounds = {}

  app.setup = (_, ctx) => {
    for (const sound of Object.entries(options)) {
      $sounds[sound[0]] = useSound(
        sound[1].src,
        sound[1].options ? sound[1].options : {}
      )
    }
  }

  inject('sounds', $sounds)
}
