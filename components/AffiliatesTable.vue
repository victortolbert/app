<script>
export default {
  props: {
    affiliates: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<template>
  <article>
    <div
      class="mt-4 overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 dark:bg-black">
          <tr>
            <th class="px-3 text-sm font-medium text-center">
              <input type="checkbox" value="checked" class="border" />
            </th>
            <th
              scope="col"
              class="px-3 py-3 text-xs font-medium tracking-wider text-left uppercase"
            >
              {{ $t('affiliates') }}
            </th>
            <th
              scope="col"
              class="px-3 py-3 text-xs font-medium tracking-wider text-left uppercase whitespace-nowrap"
            >
              {{ $t('contact_name') }}
            </th>
            <th scope="col" class="relative px-3 py-3">
              <span class="sr-only">{{ $t('edit') }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <AffiliateItem
            :affiliate="affiliate"
            v-for="affiliate in affiliates"
            :key="affiliate.id"
          />
        </tbody>
      </table>
    </div>
  </article>
</template>
