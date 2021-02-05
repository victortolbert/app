<template>
  <div>
    <div class="flex flex-col w-64 pt-5 pb-4 border-r border-gray-200">
      <NuxtLink to="/messages/" class="brand" data-testid="home-link">
        <LogoSalesLoft class="w-auto px-6 h-11" />
      </NuxtLink>

      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-1 h-0 overflow-y-auto">
        <div class="relative inline-block px-3 mt-6 text-left">
          <SidebarDropdownButton />
          <!-- <SidebarDropdown /> -->
        </div>
        <SidebarSearch />
        <!-- <SidebarStaticNav /> -->
        <nav class="px-3 mt-6">
          <SidebarMenu />
        </nav>
      </div>
    </div>
  </div>
</template>
