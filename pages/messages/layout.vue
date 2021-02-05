<template>
  <div class="flex h-screen overflow-hidden bg-white">
    <Sidebar class="hidden lg:flex lg:flex-shrink-0" />
    <SidebarOffCanvas class="lg:hidden" />

    <div class="flex flex-col flex-1 w-0 overflow-hidden">
      <SearchHeader />

      <main
        class="relative z-0 flex-1 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <PageHeader />

        <RouterView :key="$route.params.id" />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  //   layout: 'plain',
  name: 'MessagesPage',
}
</script>
