<template>
  <div
    class="flex flex-wrap-reverse"
    :class="{
      'lg:-mx-8': settings.layout === 'single',
    }"
  >
    <section
      class="w-full py-4 lg:pt-8 lg:pb-4 dark:border-gray-800"
      :class="{
        'lg:w-3/4': !document.fullscreen,
        'lg:border-l lg:border-r': settings.layout !== 'single',
      }"
    >
      <article class="prose dark:prose-dark max-w-none lg:px-8">
        <!-- <h1 class="font-bold">{{ document.title }}</h1> -->

        <h1 class="flex items-center justify-between">
          {{ document.title }}
          <Badge v-if="document.badge">{{ document.badge }}</Badge>
        </h1>
        <div v-if="document.subtitle" class="-mt-4">
          <p class="text-gray-600 dark:text-gray-400">
            {{ document.subtitle }}
          </p>
        </div>

        <p>{{ document.description }}</p>
        <NuxtContent :document="document" />
      </article>

      <AppPageBottom :document="document" />
      <!-- <AppPrevNext :prev="prev" :next="next" /> -->
    </section>

    <AppToc v-if="!document.fullscreen" :toc="document.toc" />
  </div>
</template>

<script>
import Vue from 'vue'
import {mapGetters} from 'vuex'

import AppCopyButton from '~/components/app/AppCopyButton'
import {Howl, Howler} from 'howler'
import {getColors} from 'theme-colors'

const theme = getColors('#ABABAB')

const sound = new Howl({
  src: ['sound.webm', 'sound.mp3'],
})

export default {
  // layout({store}) {
  //   return store.state.settings.layout || 'default'
  // },
  // middleware ({ app, params, redirect }) {
  //   if (params.pathMatch === 'index') {
  //     redirect(app.localePath('/'))
  //   }
  // },
  async asyncData({$content, params, error}) {
    const slug = params.slug || 'index'
    const document = await $content(slug)
      .fetch()
      .catch(err => {
        error({statusCode: 404, message: 'Document not found'})
      })

    return {
      document,
    }
  },
  computed: {
    ...mapGetters(['settings']),
  },
  mounted() {
    if (this.document.version) {
      localStorage.setItem(
        `document-${this.document.slug}-version`,
        this.document.version,
      )
    }

    setTimeout(() => {
      const blocks = document.getElementsByClassName('nuxt-content-highlight')

      for (const block of blocks) {
        const CopyButton = Vue.extend(AppCopyButton)
        const component = new CopyButton().$mount()
        block.appendChild(component.$el)
      }
    }, 100)

    // Play the sound.
    sound.play()

    console.log(theme)

    // Change global volume.
    // Howler.volume(0.5);
  },
}
</script>
