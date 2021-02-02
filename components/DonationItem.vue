<template>
  <button
    class="flex flex-col items-center w-full p-4 my-8 transition-all duration-200 ease-linear border border-gray-300 shadow-lg md:flex-row hover:border-gray-500 hover:shadow-2xl"
    :name="name"
  >
    <span class="flex flex-col mb-4 flex-no-shrink md:mr-8 md:mb-0">
      <img
        v-bind="imageSources"
        :alt="name"
        class="border border-gray-500 rounded-full"
      />
    </span>
    <span class="text-center md:text-left">
      <span class="block py-3 text-2xl font-bold">
        {{ textPrice }} — {{ name }}
      </span>
      <span v-text="description" />
    </span>
  </button>
</template>

<script>
import {computed} from '@nuxtjs/composition-api'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: 'kolle',
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return {
      textPrice: computed(() => {
        if (props.price === -1) {
          return '???? €'
        }

        const euro = props.price / 100
        return `${euro.toFixed(2).toLocaleString()} €`
      }),
      imageSources: computed(() => ({
        src: require(`~/assets/img/donations/${props.slug}.png`),
        srcset: `${require(`~/assets/img/donations/${props.slug}@2x.png`)} 2x`,
      })),
    }
  },
}
</script>
