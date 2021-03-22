<template>
  <OnClickOutside :do="close">
    <div class="search-select" :class="{'is-active': isOpen}">
      <button
        ref="button"
        @click="open"
        type="button"
        class="search-select-input"
      >
        <span v-if="value !== null">{{ value }}</span>
        <span v-else class="search-select-placeholder">Select a band...</span>
      </button>
      <div ref="dropdown" v-show="isOpen" class="search-select-dropdown">
        <input
          class="search-select-search"
          v-model="search"
          ref="search"
          @keydown.esc="close"
          @keydown.up="highlightPrev"
          @keydown.down="highlightNext"
          @keydown.enter.prevent="selectHighlighted"
          @keydown.tab.prevent
        />
        <ul
          ref="options"
          v-show="filteredOptions.length > 0"
          class="search-select-options"
        >
          <li
            class="search-select-option"
            v-for="(option, i) in filteredOptions"
            :key="option"
            @click="select(option)"
            :class="{'is-active': i === highlightedIndex}"
          >
            {{ option }}
          </li>
        </ul>
        <div v-show="filteredOptions.length === 0" class="search-select-empty">
          No results found for "{{ search }}"
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>

<script>
// import Popper from 'popper.js'
import {createPopper} from '@popperjs/core'
import {defineComponent} from '@nuxtjs/composition-api'

export default defineComponent({
  props: ['value', 'options', 'filterFunction'],
  data() {
    return {
      isOpen: false,
      search: '',
      highlightedIndex: 0,
    }
  },
  beforeDestroy() {
    this.popper.destroy()
  },
  computed: {
    filteredOptions() {
      return this.filterFunction(this.search, this.options)
    },
  },
  methods: {
    open() {
      if (this.isOpen) {
        return
      }
      this.isOpen = true
      this.$nextTick(() => {
        this.setupPopper()
        this.$refs.search.focus()
        this.scrollToHighlighted()
      })
    },
    setupPopper() {
      if (this.popper === undefined) {
        // this.popper = new Popper(this.$refs.button, this.$refs.dropdown, {
        //   placement: 'bottom',
        // })

        this.popper = createPopper(this.$refs.button, this.$refs.dropdown, {
          placement: 'bottom',
        })
      } else {
        this.popper.scheduleUpdate()
      }
    },
    close() {
      if (!this.isOpen) {
        return
      }
      this.isOpen = false
      this.$refs.button.focus()
    },
    select(option) {
      this.$emit('input', option)
      this.search = ''
      this.highlightedIndex = 0
      this.close()
    },
    selectHighlighted() {
      this.select(this.filteredOptions[this.highlightedIndex])
    },
    scrollToHighlighted() {
      this.$refs.options.children[this.highlightedIndex].scrollIntoView({
        block: 'nearest',
      })
    },
    highlight(index) {
      this.highlightedIndex = index

      if (this.highlightedIndex < 0) {
        this.highlightedIndex = this.filteredOptions.length - 1
      }

      if (this.highlightedIndex > this.filteredOptions.length - 1) {
        this.highlightedIndex = 0
      }

      this.scrollToHighlighted()
    },
    highlightPrev() {
      this.highlight(this.highlightedIndex - 1)
    },
    highlightNext() {
      this.highlight(this.highlightedIndex + 1)
    },
  },
})
</script>
