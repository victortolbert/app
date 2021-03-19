<script>
export default {
  data() {
    return {
      showMenu: false,
    }
  },
}
</script>

<template>
  <button
    class="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
    aria-expanded="false"
    @click="showMenu = !showMenu"
  >
    <span class="sr-only">{{ $t('open_main_menu') }}</span>
    <BaseIconOutlined :name="showMenu ? 'x' : 'menu'" class="block" />
  </button>
</template>
