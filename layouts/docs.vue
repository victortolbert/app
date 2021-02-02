<template>
  <div class="pt-16">
    <Navbar />
    <main class="container px-4 mx-auto lg:px-8">
      <div class="relative flex flex-wrap">
        <aside
          class="fixed inset-0 z-30 w-full mt-16 bg-white lg:w-1/5 lg:block lg:relative lg:mt-0 dark:bg-gray-900 lg:bg-transparent"
          :class="{block: menu, hidden: !menu}"
        >
          <div
            class="h-full overflow-y-scroll lg:sticky lg:top-0 lg:pt-16 lg:-mt-16 lg:h-auto"
          >
            <ul class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
              <li class="mb-4 lg:hidden">
                <SearchInput />
              </li>
              <li
                v-for="(docs, category) in categories"
                :key="category"
                class="mb-4"
              >
                <h3
                  class="mb-2 text-sm font-bold tracking-wide text-gray-500 uppercase dark:text-gray-600 lg:text-xs"
                >
                  {{ category }}
                </h3>
                <ul>
                  <li
                    v-for="doc of docs"
                    :key="doc.slug"
                    class="text-gray-600 dark:text-gray-500"
                  >
                    <NuxtLink
                      :to="toLink(doc.slug)"
                      class="block px-2 py-1 font-medium rounded hover:text-gray-800 dark-hover:text-gray-100"
                      exact-active-class="text-green-600 bg-green-100 hover:text-green-600 dark:text-white dark:bg-green-800 dark-hover:text-white"
                    >
                      {{ doc.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
              <li class="mb-4 lg:hidden">
                <h3
                  class="mb-2 text-sm font-bold tracking-wide text-gray-500 uppercase dark:text-gray-600 lg:text-xs"
                >
                  More
                </h3>
                <ul class="flex items-center ml-2">
                  <li class="mr-4">
                    <a
                      href="https://twitter.com/nuxt_js"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Twitter"
                      name="Twitter"
                      class="hover:text-green-500"
                    >
                      <IconTwitter class="w-6 h-6" />
                    </a>
                  </li>
                  <li class="mr-4">
                    <a
                      href="https://github.com/nuxt/content"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Github"
                      name="Github"
                      class="hover:text-green-500"
                    >
                      <IconGithub class="w-6 h-6" />
                    </a>
                  </li>
                  <li class="mr-4">
                    <LangSwitcher />
                  </li>
                  <li>
                    <ColorSwitcher />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>

        <Nuxt class="w-full lg:w-4/5" />
      </div>
    </main>
    <TheFooter />
  </div>
</template>

<script>
export default {
  computed: {
    bodyClass() {
      return this.$store.state.menu.open
        ? ['h-screen lg:h-auto overflow-y-hidden lg:overflow-y-auto']
        : []
    },
    menu: {
      get() {
        return this.$store.state.menu.open
      },
      set(val) {
        this.$store.commit('menu/toggle', val)
      },
    },
    categories() {
      return this.$store.state.categories[this.$i18n.locale]
    },
  },
  methods: {
    toLink(slug) {
      if (slug === 'index') {
        return this.localePath('slug')
      }
      return this.localePath({name: 'slug', params: {slug}})
    },
  },
  head() {
    const i18nSeo = this.$nuxtI18nSeo()

    return {
      bodyAttrs: {
        class: [
          ...this.bodyClass,
          'antialiased text-gray-800 leading-normal bg-white dark:bg-gray-900 dark:text-gray-100',
        ],
      },
      ...i18nSeo,
    }
  },
}
</script>

<style>
pre[class*='language-'] {
  margin: 0 !important;
}
</style>
