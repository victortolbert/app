<template>
  <div class="flex items-center">
    <ButtonMobileMenu />

    <div class="flex items-center flex-shrink-0 h-8 px-4">
      <NuxtLink
        class="flex items-center flex-shrink-0 m-2"
        :to="localePath('/')"
      >
        <IconEma class="h-8 text-blue-900" />
      </NuxtLink>
    </div>

    <div
      class="items-center hidden h-8 px-4 space-x-4 text-xs tracking-wide uppercase md:flex"
    >
      <NuxtLink
        :to="localePath(link.path)"
        class="flex items-center space-x-1"
        :class="{
          'text-primary-500 font-bold border-transparent border-b-2':
            link.isHighlighted,
        }"
        v-for="link in navbarLinks"
        :key="link.path"
      >
        <span
          :class="{
            'border-primary-700': link.isHighlighted,
          }"
        >
          {{ link.label }}
        </span>
        <!-- IconCaretDown -->
        <svg
          v-if="link.hasDropdown"
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    open: false,
    person: {
      firstName: 'Andy',
      lastName: 'Cook',
      email: 'andy@promiseserves.org',
    },
  }),
  computed: {
    navbarLinks() {
      return [
        {
          label: this.$t('all_affiliates'),
          path: '/affiliates',
          hasDropdown: true,
        },
        {
          label: 'Ema',
          path: '/ema',
          isHighlighted: true,
          hasDropdown: true,
          id: 1,
        },
        {
          label: this.$t('people'),
          path: '/people',
        },
        {
          label: this.$t('events'),
          path: '/events',
        },
        {
          label: this.$t('needs'),
          path: '/needs',
        },
        {
          label: this.$t('resources'),
          path: '/resources',
        },
      ]
    },
    personInitials() {
      return `
        ${this.person.firstName.charAt(0)} ${this.person.firstName.charAt(0)}
      `.toUpperCase()
    },

    menu: {
      get() {
        return this.$store.state.menu.open
      },
      set(val) {
        this.$store.commit('menu/toggle', val)
      },
    },
    lastRelease() {
      return this.$store.state.releases[0]
    },
  },
  methods: {
    scrollToTop() {
      if (window.innerWidth >= 1280) {
        return
      }
      window.scrollTo(0, 0)
    },
    noop() {},
  },
}
</script>
