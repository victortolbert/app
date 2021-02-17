<template>
  <div
    :class="['mx-auto max-h-screen overflow-y-auto shadow-lg', widthSizeClass]"
  >
    <div
      :class="[
        'modal-card rounded-xl bg-white shadow-lg mx-auto',
        widthSizeClass,
      ]"
    >
      <header class="relative items-start bg-white modal-card-head">
        <slot name="header">
          <div class="items-center justify-between text-xl font-weight-normal">
            <span style="width: 24px; height: 48px" />
            <h2 class="mt-6 text-2xl font-bold text-center capitalize">
              {{ header }}
            </h2>
            <h4
              v-if="subheader.length > 0"
              class="text-lg text-center"
              v-html="subheader"
            />
            <a
              href="#"
              class="absolute self-start text-black"
              style="top: 1rem; right: 1rem"
              @click.prevent="closeModal"
            >
              <span class="icon">
                <FontAwesomeIcon :icon="['fas', 'times']" />
              </span>
            </a>
          </div>
        </slot>
      </header>
      <section class="p-0 overflow-auto modal-card-body">
        <slot>
          <div
            class="p-4 text-sm bg-white modal-card-body md:p-6 sm:text-base md:text-lg"
          >
            <p class="mb-4">{{ content }}</p>
          </div>
        </slot>
      </section>
      <div class="card-footer">
        <div class="flex-col card-footer-item">
          <slot name="footer">
            {{ footer }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionModal',
  props: {
    header: {
      type: String,
      default: '',
    },
    subheader: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    footer: {
      type: String,
      default: '',
    },
    widthSize: {
      type: String,
      default: '',
    },
  },
  computed: {
    widthSizeClass() {
      if (this.widthSize === 'small') {
        return 'max-w-sm'
      }

      return ''
    },
  },
  methods: {
    closeModal() {
      this.$emit('close')
      this.$parent.$emit('close')
    },
  },
}
</script>
