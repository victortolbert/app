<!-- @vue-ignore -->
<script>
export default {
  name: 'ProfileDropdown',
}
</script>

<template>
  <!-- Profile dropdown -->

  <!-- <div class="relative ml-3"> -->
  <!-- <ProfileDropdownButton /> -->
  <!--
      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    -->
  <!-- <DropdownPanel /> -->
  <!-- </div> -->

  <div class="relative flex-shrink-0 ml-4">
    <div>
      <button
        type="button"
        class="flex text-sm text-white rounded-full focus:outline-none focus:bg-primary-900 focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-white"
        id="user-menu"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <span class="sr-only">Open user menu</span>
        <img
          class="w-8 h-8 rounded-full"
          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=iXNbLPGHnb&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
          alt=""
        />
      </button>
    </div>

    <!--
                  Dropdown menu, show/hide based on menu state.

                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                  Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->
    <div
      v-if="false"
      class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <a
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
        >Your Profile</a
      >

      <a
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
        >Settings</a
      >

      <a
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
        >Sign out</a
      >
    </div>
  </div>
</template>
