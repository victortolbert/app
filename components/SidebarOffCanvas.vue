<template>
  <div :class="{hidden: $store.state.isMenuOpen === false}">
    <div class="fixed inset-0 z-40 flex">
      <div class="fixed inset-0">
        <div class="absolute inset-0 bg-gray-600 opacity-75" />
      </div>

      <div
        class="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white"
      >
        <SidebarCloseButton />

        <SalesLoftLogo class="px-4" />

        <div class="flex-1 h-0 mt-5 overflow-y-auto">
          <nav class="px-2">
            <SidebarMenu />
          </nav>
        </div>
      </div>

      <div class="flex-shrink-0 w-14">
        <!-- Dummy element to force sidebar to shrink to fit close icon -->
      </div>
    </div>
  </div>
</template>
