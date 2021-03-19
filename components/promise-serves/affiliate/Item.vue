<script>
export default {
  props: {
    affiliate: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      showMenu: true,
    }
  },
}
</script>

<template>
  <tr class="bg-white dark:bg-black dark:text-white">
    <td class="px-3 text-sm font-medium text-center whitespace-nowrap">
      <input type="checkbox" value="checked" class="border" />
    </td>
    <td class="px-3 text-sm font-medium whitespace-nowrap">
      <NuxtLink
        class="text-blue-500"
        :to="localePath(`/${affiliate.subdomain}`)"
      >
        {{ affiliate.affiliate_name }}
      </NuxtLink>
      <br />
      <small class="font-light tracking-widest uppercase text-2xs">
        {{ affiliate.affiliate_address_city }},
        {{ affiliate.affiliate_address_state }}
      </small>
    </td>
    <td class="px-3 text-sm whitespace-nowrap">
      {{ affiliate.affiliate_contact_name }}
    </td>
    <td class="px-3 text-sm font-medium text-right whitespace-nowrap">
      <!-- DropdownRowActions -->
      <div>
        <button
          @click="showMenu = !showMenu"
          type="button"
          class="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <svg
            :class="{'transform rotate-90': showMenu}"
            class="w-6 h-6 mr-1 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>
