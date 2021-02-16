<template>
  <div class="flex items-center justify-between">
    <NuxtLink
      v-if="prev"
      :to="toLink(prev.slug)"
      class="flex items-center p-2 pl-0 font-bold text-green-500 hover:underline"
    >
      <IconArrowLeft class="w-4 h-4 mr-1" />
      {{ prev.title }}
    </NuxtLink>
    <span v-else>&nbsp;</span>
    <NuxtLink
      v-if="next"
      :to="toLink(next.slug)"
      class="flex items-center p-2 pr-0 font-bold text-green-500 hover:underline"
    >
      {{ next.title }}
      <IconArrowRight class="w-4 h-4 ml-1" />
    </NuxtLink>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null,
    },
    next: {
      type: Object,
      default: () => null,
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
}
</script>
