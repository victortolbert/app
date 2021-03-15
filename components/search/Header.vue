<template>
  <div
    class="relative z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 lg:hidden"
  >
    <SidebarToggle />
    <div class="flex justify-between flex-1 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-1">
        <SearchForm />
      </div>
      <div class="flex items-center">
        <ProfileDropdown />
      </div>
    </div>
  </div>
</template>
