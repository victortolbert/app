<template>
  <div class="m-4 overflow-hidden rounded-xl">
    <div :class="cardClasses" class="card">
      <header
        v-if="duration === 0"
        class="pt-4 pr-4 -mb-16 text-white border-b-0 shadow-none card-header bg-blue"
      >
        <p
          class="flex items-center justify-between text-center text-white modal-card-title"
        >
          <span style="width: 24px; height: 48px" />
          <a
            href="#"
            class="self-start text-white hover:text-white"
            style="width: 24px; height: 48px"
            @click.prevent="close"
          >
            <span class="icon">
              <FontAwesomeIcon :icon="['fas', 'times']" size="xs" />
            </span>
          </a>
        </p>
      </header>
      <div class="py-16 text-center text-white card-content sm:px-32">
        <FontAwesomeIcon :icon="['fas', 'check']" size="3x" />
        <p v-if="title" class="text-xl font-bold capitalize" v-text="title" />
        <p
          v-if="subtitle"
          class="mx-auto text-base max-w-2xs sm:max-w-xs md:-mx-4"
          v-text="subtitle"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalSaveSuccess',
  props: {
    type: {
      type: String,
      default: 'success',
    },
    duration: {
      type: Number,
      default: 1000,
    },
    title: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    reload: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardClasses() {
      return {
        'bg-blue': this.type === 'success',
        'bg-red': this.type === 'error',
      }
    },
  },
  mounted() {
    // this.blur()
    if (this.duration > 0) {
      setTimeout(() => {
        this.close()
      }, this.duration)
    }
  },
  methods: {
    close() {
      if (this.reload) {
        // Refresh the page so the updates will take effect throughout the frontend
        location.reload()
      }
      this.$emit('close')
      // this.unBlur()
    },
  },
}
</script>
