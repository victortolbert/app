<script>
import {defineComponent} from '@nuxtjs/composition-api'

const book = {
  title: "Old Man's War",
  author: {
    firstName: 'John',
    lastName: 'Scalzi',
  },
}

export default defineComponent({
  data: () => ({
    books: [book],
    selectedBook: book,
    Deselect: {
      render: createElement => createElement('span', '❌'),
    },
    OpenIndicator: {
      render: createElement => createElement('span', '🔽'),
    },
    options: [
      'Angular',
      'Angular 2',
      'Aurelia',
      'Backbone',
      'Ember',
      'jQuery',
      'Meteor',
      'Node.js',
      'Polymer',
      'React',
      'RxJS',
      'Svelte',
      'Vue.js',
    ],
    siteOptions: [
      {
        title: 'Read the Docs',
        icon: 'fa-book',
        url: 'https://codeclimate.com/github/sagalbot/vue-select',
      },
      {
        title: 'View on GitHub',
        icon: 'fa-github',
        url: 'https://codeclimate.com/github/sagalbot/vue-select',
      },
      {
        title: 'View on NPM',
        icon: 'fa-database',
        url: 'https://codeclimate.com/github/sagalbot/vue-select',
      },
      {
        title: 'View Codepen Examples',
        icon: 'fa-pencil',
        url: 'https://codeclimate.com/github/sagalbot/vue-select',
      },
    ],
    name: '',
    selected: null,
    value: '',
  }),
  computed: {
    filteredOptions() {
      return this.options.filter(option => {
        return (
          option.toString().toLowerCase().indexOf(this.name.toLowerCase()) >= 0
        )
      })
    },
  },
  methods: {
    handleBlur(event) {
      console.log('blurred...')
    },
  },
})
</script>
<template>
  <PageWrapper>
    <PageHeading>{{ $t('dashboard') }}</PageHeading>
  </PageWrapper>
</template>

<style>
.vs__fade-enter-active,
.vs__fade-leave-active {
  transition: none;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  .vs__fade-enter-active,
  .vs__fade-leave-active {
    transition: none;
  }
  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    .vs__fade-enter-active,
    .vs__fade-leave-active {
      transition: none;
    }
    .style-chooser .vs__search::placeholder,
    .style-chooser .vs__dropdown-toggle,
    .style-chooser .vs__dropdown-menu {
      .vs__fade-enter-active,
      .vs__fade-leave-active {
        transition: none;
      }
      .style-chooser .vs__search::placeholder,
      .style-chooser .vs__dropdown-toggle,
      .style-chooser .vs__dropdown-menu {
        .vs__fade-enter-active,
        .vs__fade-leave-active {
          transition: none;
        }
        .style-chooser .vs__search::placeholder,
        .style-chooser .vs__dropdown-toggle,
        .style-chooser .vs__dropdown-menu {
          .vs__fade-enter-active,
          .vs__fade-leave-active {
            transition: none;
          }
          .style-chooser .vs__search::placeholder,
          .style-chooser .vs__dropdown-toggle,
          .style-chooser .vs__dropdown-menu {
            .vs__fade-enter-active,
            .vs__fade-leave-active {
              transition: none;
            }
            .style-chooser .vs__search::placeholder,
            .style-chooser .vs__dropdown-toggle,
            .style-chooser .vs__dropdown-menu {
              .vs__fade-enter-active,
              .vs__fade-leave-active {
                transition: none;
              }
              .style-chooser .vs__search::placeholder,
              .style-chooser .vs__dropdown-toggle,
              .style-chooser .vs__dropdown-menu {

.vs__fade-enter-active,
.vs__fade-leave-active {
  transition: none;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  .vs__fade-enter-active,
  .vs__fade-leave-active {
    transition: none;
  }
  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    .vs__fade-enter-active,
    .vs__fade-leave-active {
      transition: none;
    }
    .style-chooser .vs__search::placeholder,
    .style-chooser .vs__dropdown-toggle,
    .style-chooser .vs__dropdown-menu {
      .vs__fade-enter-active,
      .vs__fade-leave-active {
        transition: none;
      }
      .style-chooser .vs__search::placeholder,
      .style-chooser .vs__dropdown-toggle,
      .style-chooser .vs__dropdown-menu {

.vs__fade-enter-active,
.vs__fade-leave-active {
  transition: none;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  .vs__fade-enter-active,
  .vs__fade-leave-active {
    transition: none;
  }
  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {

.vs__fade-enter-active,
.vs__fade-leave-active {
  transition: none;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {

.vs__fade-enter-active,
.vs__fade-leave-active {
  transition: none;
}

.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle,
.style-chooser .vs__dropdown-menu {
  /* background: theme('colors.white');
  border: none;
  color: #394066;
  text-transform: lowercase;
  font-variant: small-caps; */
  appearance: none;
  background-color: #fff;
  border-color: #6b7280;
  border-width: 1px;
  border-radius: 0px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
}

.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

  appearance: none;
  background-color: #fff;
  border-color: #6b7280;
  border-width: 1px;
  border-radius: 0px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
}
.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

    appearance: none;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px;
    border-radius: 0px;
    padding-top: 0.5rem;
    padding-right: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
    @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
  }
  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #394066;
  }
  appearance: none;
  background-color: #fff;
  border-color: #6b7280;
  border-width: 1px;
  border-radius: 0px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
}
.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

        appearance: none;
        background-color: #fff;
        border-color: #6b7280;
        border-width: 1px;
        border-radius: 0px;
        padding-top: 0.5rem;
        padding-right: 0.75rem;
        padding-bottom: 0.5rem;
        padding-left: 0.75rem;
        font-size: 1rem;
        line-height: 1.5rem;
        @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
      }
      .style-chooser .vs__clear,
      .style-chooser .vs__open-indicator {
        fill: #394066;
      }
      appearance: none;
      background-color: #fff;
      border-color: #6b7280;
      border-width: 1px;
      border-radius: 0px;
      padding-top: 0.5rem;
      padding-right: 0.75rem;
      padding-bottom: 0.5rem;
      padding-left: 0.75rem;
      font-size: 1rem;
      line-height: 1.5rem;
      @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
    }
    .style-chooser .vs__clear,
    .style-chooser .vs__open-indicator {
      fill: #394066;
    }
    appearance: none;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px;
    border-radius: 0px;
    padding-top: 0.5rem;
    padding-right: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
    @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
  }
  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #394066;
  }
  appearance: none;
  background-color: #fff;
  border-color: #6b7280;
  border-width: 1px;
  border-radius: 0px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
}
.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}

                appearance: none;
                background-color: #fff;
                border-color: #6b7280;
                border-width: 1px;
                border-radius: 0px;
                padding-top: 0.5rem;
                padding-right: 0.75rem;
                padding-bottom: 0.5rem;
                padding-left: 0.75rem;
                font-size: 1rem;
                line-height: 1.5rem;
                @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
              }
              .style-chooser .vs__clear,
              .style-chooser .vs__open-indicator {
                fill: #394066;
              }
              appearance: none;
              background-color: #fff;
              border-color: #6b7280;
              border-width: 1px;
              border-radius: 0px;
              padding-top: 0.5rem;
              padding-right: 0.75rem;
              padding-bottom: 0.5rem;
              padding-left: 0.75rem;
              font-size: 1rem;
              line-height: 1.5rem;
              @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
            }
            .style-chooser .vs__clear,
            .style-chooser .vs__open-indicator {
              fill: #394066;
            }
            appearance: none;
            background-color: #fff;
            border-color: #6b7280;
            border-width: 1px;
            border-radius: 0px;
            padding-top: 0.5rem;
            padding-right: 0.75rem;
            padding-bottom: 0.5rem;
            padding-left: 0.75rem;
            font-size: 1rem;
            line-height: 1.5rem;
            @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
          }
          .style-chooser .vs__clear,
          .style-chooser .vs__open-indicator {
            fill: #394066;
          }
          appearance: none;
          background-color: #fff;
          border-color: #6b7280;
          border-width: 1px;
          border-radius: 0px;
          padding-top: 0.5rem;
          padding-right: 0.75rem;
          padding-bottom: 0.5rem;
          padding-left: 0.75rem;
          font-size: 1rem;
          line-height: 1.5rem;
          @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
        }
        .style-chooser .vs__clear,
        .style-chooser .vs__open-indicator {
          fill: #394066;
        }
        appearance: none;
        background-color: #fff;
        border-color: #6b7280;
        border-width: 1px;
        border-radius: 0px;
        padding-top: 0.5rem;
        padding-right: 0.75rem;
        padding-bottom: 0.5rem;
        padding-left: 0.75rem;
        font-size: 1rem;
        line-height: 1.5rem;
        @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
      }
      .style-chooser .vs__clear,
      .style-chooser .vs__open-indicator {
        fill: #394066;
      }
      appearance: none;
      background-color: #fff;
      border-color: #6b7280;
      border-width: 1px;
      border-radius: 0px;
      padding-top: 0.5rem;
      padding-right: 0.75rem;
      padding-bottom: 0.5rem;
      padding-left: 0.75rem;
      font-size: 1rem;
      line-height: 1.5rem;
      @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
    }
    .style-chooser .vs__clear,
    .style-chooser .vs__open-indicator {
      fill: #394066;
    }
    appearance: none;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px;
    border-radius: 0px;
    padding-top: 0.5rem;
    padding-right: 0.75rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
    @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
  }
  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #394066;
  }
  appearance: none;
  background-color: #fff;
  border-color: #6b7280;
  border-width: 1px;
  border-radius: 0px;
  padding-top: 0.5rem;
  padding-right: 0.75rem;
  padding-bottom: 0.5rem;
  padding-left: 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  @apply block w-full shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm border-gray-300 rounded-md;
}
.style-chooser .vs__clear,
.style-chooser .vs__open-indicator {
  fill: #394066;
}
</style>
