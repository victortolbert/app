<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    perPage: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    buttonStyles() {
      return 'border rounded px-4 py-1 text-sm bg-white flex justify-center items-center sm:uppercase hover:bg-blue-500 hover:text-white transform duration-500 ease-in-out'
    },
    disabledStyle() {
      return 'border rounded px-4 py-1 text-sm bg-white flex justify-center items-center sm:uppercase text-gray-300'
    },
    totalPages() {
      return Math.ceil(this.total / this.perPage)
    },
    currentPage() {
      return parseInt(this.$route.params.page) || 1
    },
    prevPage() {
      return this.currentPage > 1 ? this.currentPage - 1 : 1
    },
    nextPage() {
      return this.currentPage < this.totalPages
        ? this.currentPage + 1
        : this.totalPages
    },
  },
}
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <div v-if="currentPage === 1" :class="disabledStyle">
      <span class="hidden sm:inline">First</span>
      <BaseIconSolid name="single-back" />
    </div>

    <NuxtLink
      v-else
      :to="localePath({path: '/articles/', params: {page: 1}})"
      :class="buttonStyles"
    >
      <BaseIconSolid name="double-back" />
      <span class="hidden sm:inline">First</span>
    </NuxtLink>

    <div v-if="currentPage === 1" :class="disabledStyle">
      <span class="hidden sm:inline">Prev</span>
      <BaseIconSolid name="single-back" />
    </div>

    <NuxtLink
      v-else
      :to="localePath({path: '/articles/', params: {page: prevPage}})"
      :class="buttonStyles"
    >
      <BaseIconSolid name="single-back" />
      <span class="hidden sm:inline">Prev</span>
    </NuxtLink>

    <div v-if="currentPage === totalPages" :class="disabledStyle">
      <span class="hidden sm:inline"> {{ $t('next') }}</span>
      <BaseIconSolid name="single-fwd" />
    </div>

    <NuxtLink
      v-else
      :to="localePath({path: '/articles/', params: {page: nextPage}})"
      :class="buttonStyles"
    >
      <span class="hidden sm:inline"> {{ $t('next') }}</span>
      <BaseIconSolid name="single-fwd" />
    </NuxtLink>

    <div v-if="currentPage === totalPages" :class="disabledStyle">
      <span class="hidden sm:inline">{{ $t('last') }}</span>
      <BaseIconSolid name="double-fwd" />
    </div>

    <NuxtLink
      v-else
      :to="localePath({path: '/articles/', params: {page: totalPages}})"
      :class="buttonStyles"
    >
      <span class="hidden sm:inline">{{ $t('last') }}</span>
      <BaseIconSolid name="double-fwd" />
    </NuxtLink>
  </div>
</template>
