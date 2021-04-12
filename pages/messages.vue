<script>
export default {
  nuxtI18n: false,
}
</script>

<template>
  <article class="flex-1">
    <section class="flex h-full p-8 overflow-hidden bg-white rounded-lg shadow">
      <Sidebar class="hidden lg:flex lg:flex-shrink-0" />
      <SidebarOffCanvas class="lg:hidden" />

      <div class="flex flex-col flex-1 w-0 overflow-hidden">
        <SearchHeader />

        <main
          class="relative z-0 flex-1 overflow-y-auto focus:outline-none"
          tabindex="0"
        >
          <PageHeader />

          <NuxtChild :key="$route.params.id" />
        </main>
      </div>
    </section>
  </article>
</template>
