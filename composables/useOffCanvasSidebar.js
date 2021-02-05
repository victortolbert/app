import {ref, watchEffect} from '@nuxtjs/composition-api'

export default function useOffCanvasSidebar() {
  const sidebarOpen = ref(false)

  watchEffect(() => sidebarOpen.value)

  return {
    sidebarOpen,
  }
}
