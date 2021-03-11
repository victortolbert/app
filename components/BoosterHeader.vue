<template>
  <header
    v-scroll="handleScroll"
    class="w-full px-6 text-white bg-center bg-cover shadow app-header bg-primary-500"
  >
    <div class="flex items-center justify-between w-full mx-auto">
      <slot />
      <div class="flex">
        <button
          ref="openButton"
          :class="[!isOpen ? 'visible' : 'invisible']"
          type="button"
          class="inline-block text-white focus:outline-none focus:text-white"
          aria-label="Menu"
          @click="toggle"
        >
          <BaseIconOutlined name="menu" class="text-white" />
        </button>
      </div>
    </div>
    <div>
      <Transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
        appear
      >
        <div v-show="isOpen" class="fixed z-10 transition-opacity pin">
          <div
            class="absolute bg-black opacity-50 pin"
            tabindex="-1"
            @click="close"
          />
        </div>
      </Transition>
      <Transition
        enter-class="translate-x-full"
        enter-active-class="ease-out transition-slow"
        enter-to-class="translate-x-0"
        leave-class="translate-x-0"
        leave-active-class="ease-in transition-medium"
        leave-to-class="translate-x-full"
        appear
      >
        <nav
          v-show="isOpen"
          class="absolute right-0 z-10 w-full max-w-xs mr-0 transition-transform bg-white shadow-lg ocm pin-t pin-r"
        >
          <button
            type="button"
            class="absolute inline-block mt-4 -ml-8 text-white focus:outline-none focus:text-white"
            aria-label="Close"
            @click="close"
          >
            <FontAwesomeIcon
              :icon="['fal', 'times']"
              class="text-white fa-2x"
            />
          </button>
          <div class="max-h-screen overflow-y-auto">
            <!-- Program(s) Section -->
            <div class="relative z-10 bg-white">
              <div
                v-for="(program, i) in programs"
                :key="i"
                :class="program.microsite.microsite_color_theme.theme_name"
              >
                <div
                  class="flex items-baseline justify-between p-2 px-4 m-0 font-bold leading-tight border-t-8 nav-section themed text-grey-darker bg-grey-light"
                >
                  <div
                    :class="[
                      'mr-1',
                      {
                        'w-2/3': !getMinIdParticipant(program).participant_info
                          .family_pledging_enabled,
                      },
                    ]"
                    class="mr-1"
                  >
                    {{ program.event_name }}
                  </div>
                  <span
                    v-if="
                      !getMinIdParticipant(program).participant_info
                        .family_pledging_enabled
                    "
                    class="inline-block w-1/3 pr-1 ml-1 text-xs font-medium text-right truncate text-grey-darker"
                  >
                    {{ getMinIdParticipant(program).first_name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script>
import Scroll from '~/directives/scroll'

export default {
  name: 'AppHeader',
  directives: {
    Scroll,
  },

  props: {
    programs: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      isOpen: false,
      linkClasses:
        'm-0 p-4 px-4 font-medium text-blue-dark border-grey-light focus:text-blue-darker hover:text-blue-darker active:text-blue-darker hover:bg-grey-lighter border-b',
      orgAdmin: 50,
    }
  },

  computed: {
    isOrgAdmin() {
      return this.$store.state.User.group_membership.includes(this.orgAdmin)
    },
  },

  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (isOpen) {
          // Disable scrolling.
          document.body.style.setProperty('overflow', 'hidden')
          document.documentElement.style.setProperty('overflow', 'hidden')
        } else {
          // Enable scrolling.
          document.body.style.removeProperty('overflow')
          document.documentElement.style.removeProperty('overflow', 'hidden')
        }
      },
    },
  },
  methods: {
    getMinIdParticipant(program) {
      return program.participants.reduce((min, current) =>
        min.id < current.id ? min : current,
      )
    },
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    toggle() {
      this.isOpen = !this.isOpen
    },
    handleScroll(evt, el) {
      if (window.scrollY > 50) {
        el.classList.add('shrink')
      } else {
        el.classList.remove('shrink')
      }
    },
  },
}
</script>
