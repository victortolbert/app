import {ref, watchEffect} from '@nuxtjs/composition-api'

export default function useOffCanvasSidebar() {
  const sidebarOpen = ref(false)

  watchEffect(() => console.log(sidebarOpen.value))

  return {
    sidebarOpen,
  }
}
