<template>
  <div>
    <header class="top-0 flex items-center justify-between h-20 px-8 lg:sticky">
      <nuxt-link
        to="/"
        class="flex items-center text-gray-800 transition duration-150 ease-in-out hover:text-gray-600 dark:text-white dark-hover:text-gray-400 focus:outline-none focus:underline"
      >
        <svg
          class="flex-shrink-0 w-6 h-6 mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        Nuxt.js Blog Starter
      </nuxt-link>

      <div class="ml-8">
        <button
          class="text-gray-800 hover:text-gray-600 dark:text-white dark-hover:text-gray-400 focus:outline-none"
          @click="
            $colorMode.value === 'dark'
              ? ($colorMode.preference = 'light')
              : ($colorMode.preference = 'dark')
          "
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-6 h-6"
          >
            <path
              v-if="$colorMode.value === 'dark'"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
            <path
              v-else
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </header>

    <div class="max-w-4xl px-4 py-16 mx-auto">
      <div class="max-w-2xl mx-auto mb-16 text-center">
        <h2 class="mb-2 text-3xl font-extrabold dark:text-white">
          {{ article.title }}
        </h2>
        <p class="mb-4 text-xl text-gray-700 dark:text-gray-400">
          {{ article.description }}
        </p>
        <div class="flex justify-center text-gray-500">
          <time datetime="2020-03-16">{{
            $moment(article.date).format('LL')
          }}</time>
          <span class="mx-1">&middot;</span>
          <span>{{ readingTime }} min read</span>
        </div>
      </div>

      <div class="relative">
        <div
          class="h-full mb-8 lg:absolute lg:right-0 lg:w-56 lg:-mr-64 lg:mb-0 lg:-mt-8"
        >
          <div class="lg:sticky lg:top-0 lg:pt-8 lg:-mb-8">
            <div
              class="overflow-hidden bg-white rounded shadow dark:bg-gray-700 dark:text-white"
            >
              <div class="p-6">
                <p class="mb-2 font-bold">Table of Contents</p>

                <div class="-ml-8">
                  <scrollactive
                    highlight-first-item
                    active-class="text-nuxt-lightgreen"
                  >
                    <a
                      v-for="link of article.toc"
                      :key="link.id"
                      :href="`#${link.id}`"
                      class="block mb-1 text-sm last:mb-0 scrollactive-item"
                      :class="`ml-${link.depth * 4}`"
                      >{{ link.text }}</a
                    >
                  </scrollactive>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col mb-4 overflow-hidden rounded shadow">
          <div class="flex-shrink-0">
            <img
              class="object-cover w-full"
              :src="`https://nuxtjs.org/${article.imgUrl}`"
              alt
            />
          </div>

          <div
            class="flex flex-col justify-between flex-1 p-8 bg-white dark:bg-gray-700"
          >
            <nuxt-content :document="article" />
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between mb-16">
        <nuxt-link
          v-if="prev"
          :to="`/${prev.slug}`"
          class="flex items-center text-nuxt-lightgreen hover:underline"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5 mr-2">
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          {{ prev.title }}
        </nuxt-link>
        <span v-else>&nbsp;</span>

        <nuxt-link
          v-if="next"
          :to="`/${next.slug}`"
          class="flex items-center text-nuxt-lightgreen hover:underline"
        >
          {{ next.title }}
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5 ml-2">
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </nuxt-link>
        <span v-else>&nbsp;</span>
      </div>

      <div class="max-w-xl mx-auto text-center">
        <img
          :src="article.authors[0].avatarUrl"
          class="w-24 h-24 mx-auto mb-4 rounded-full"
        />
        <h2 class="mb-2 text-3xl font-bold dark:text-white">
          {{ article.authors[0].name }}
        </h2>
        <a
          :href="article.authors[0].link"
          target="_blank"
          class="text-lg font-medium hover:underline text-nuxt-lightgreen"
          >Twitter</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({$content, params, error}) {
    let article
    try {
      article = await $content('articles', params.slug).fetch()
      // OR const article = await $content(`articles/${params.slug}`).fetch()
    } catch (e) {
      error({message: 'Article not found'})
    }
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('date', 'desc')
      .surround(params.slug, {before: 1, after: 1})
      .fetch()
    return {
      article,
      prev,
      next,
    }
  },
  computed: {
    readingTime() {
      return Math.ceil(
        this.$moment.duration(this.article.readingTime).asMinutes(),
      )
    },
  },
  head() {
    return {
      title: this.article.title,
    }
  },
}
</script>

<style lang="postcss">
.dark-mode {
  .nuxt-content {
    @apply text-white;
    blockquote {
      @apply border-gray-800;
    }
    > code,
    li > code,
    p > code {
      @apply bg-gray-800;
    }
  }
}
.nuxt-content {
  h2 {
    @apply text-xl font-bold my-6 table;
    &::after {
      content: ' ';
      @apply w-4/5 block border-2 border-green-500 rounded;
    }
    > a {
      &::before {
        content: '#';
        @apply text-nuxt-lightgreen font-normal -ml-4 pr-1 absolute opacity-0;
      }
    }
    &:hover {
      > a::before {
        @apply opacity-100;
      }
    }
  }
  h3 {
    @apply text-lg font-medium my-6 table;
    &::after {
      content: ' ';
      @apply w-4/5 block border-2 border-gray-500 rounded;
    }
    > a {
      &::before {
        content: '#';
        @apply text-nuxt-lightgreen font-normal -ml-4 pr-1 absolute opacity-0;
      }
    }
    &:hover {
      > a::before {
        @apply opacity-100;
      }
    }
  }
  ul {
    @apply list-disc list-inside;
    > li {
      @apply mb-1;
    }
  }
  ol {
    @apply list-decimal list-inside;
    > li {
      @apply mb-1;
    }
  }
  a {
    @apply underline;
  }
  p {
    @apply mb-4;
  }
  blockquote {
    @apply py-2 pl-4 mb-4 border-l-4;
    > p:last-child {
      @apply mb-0;
    }
  }
  > code,
  li > code,
  p > code {
    @apply bg-gray-100 p-1 text-sm shadow rounded;
  }
  pre[class*='language-'] {
    @apply rounded mt-0 mb-4 bg-gray-800 relative;
    > code {
      @apply bg-gray-800 relative;
      text-shadow: none;
    }
  }
  &-highlight {
    @apply relative;
    > .filename {
      @apply absolute right-0 text-gray-600 font-semibold z-10 mr-2 text-sm;
    }
  }
}
</style>
