<template>
  <main class="flex flex-1">
    <div
      class="w-full py-4 lg:pt-8 lg:pb-4 dark:border-gray-800 lg:border-l lg:border-r"
      :class="{'': doc.toc && doc.toc.length, 'lg:w-3/4': !doc.fullscreen}"
    >
      <article
        class="prose lg:px-8 dark:prose-dark max-w-none"
        :class="{'prose-dark dark': $colorMode.value === 'dark'}"
      >
        <h1>{{ $t(doc.title) }}</h1>

        <NuxtContent :document="doc" />
      </article>

      <EditOnGithub :document="doc" />
      <ArticlePrevNext :prev="prev" :next="next" class="mt-4 lg:px-8" />
    </div>
    <SidebarToc v-if="doc.toc && doc.toc.length" :toc="doc.toc" />
  </main>
</template>

<script>
import Clipboard from 'clipboard'

export default {
  name: 'PageSlug',
  layout: 'docs',
  middleware({params, redirect}) {
    if (params.slug === 'index') {
      redirect('/')
    }
  },
  async asyncData({$content, store, app, params, error}) {
    const slug = params.slug || 'index'
    let doc
    try {
      doc = await $content(app.i18n.locale, slug).fetch()
    } catch (e) {
      return error({statusCode: 404, message: 'Page not found'})
    }
    const [prev, next] = await $content(app.i18n.locale)
      .only(['title', 'slug'])
      .sortBy('position', 'asc')
      .surround(slug, {before: 1, after: 1})
      .fetch()
    return {
      doc,
      prev,
      next,
    }
  },
  mounted() {
    const blocks = document.getElementsByClassName('nuxt-content-highlight')
    for (const block of blocks) {
      const button = document.createElement('button')
      button.className = 'copy'
      button.textContent = 'Copy'
      block.appendChild(button)
    }
    const copyCode = new Clipboard('.copy', {
      target(trigger) {
        return trigger.previousElementSibling
      },
    })
    copyCode.on('success', function (event) {
      event.clearSelection()
      event.trigger.textContent = 'Copied!'
      window.setTimeout(function () {
        event.trigger.textContent = 'Copy'
      }, 2000)
    })
  },
  computed: {
    readingTime() {
      return Math.ceil(this.$moment.duration(this.doc.readingTime).asMinutes())
    },
  },
  head() {
    return {
      title: this.doc.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.doc.description,
        },
        // Open Graph
        {hid: 'og:title', property: 'og:title', content: this.doc.title},
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.doc.description,
        },
        // Twitter Card
        {hid: 'twitter:title', name: 'twitter:title', content: this.doc.title},
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.doc.description,
        },
      ],
    }
  },
}
</script>

<style>
:target {
  -webkit-animation: target-fade 3s 1;
  -moz-animation: target-fade 3s 1;
}

@-webkit-keyframes target-fade {
  0% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
  }
}
@-moz-keyframes target-fade {
  0% {
    background-color: rgba(0, 0, 0, 0.1);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
  }
}

@keyframes yellowfade {
  from {
    background: yellow;
  }
  to {
    background: transparent;
  }
}

p.item-highlight {
  animation: yellowfade 1s;
}
</style>
