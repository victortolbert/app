<script setup>
definePageMeta({
  title: 'Advanced search',
  breadcrumb: 'Advanced search',
  layout: 'hancock',
})

const groups = computed(() => {
  return [{
    key: 'users',
    label: q => q && `Users matching “${q}”...`,
    search: async (q) => {
      if (!q)
        return []

      const users = await $fetch('https://jsonplaceholder.typicode.com/users', { params: { q } })

      return users.map(user => ({ id: user.id, label: user.name, suffix: user.email }))
    },
  }].filter(Boolean)
})
</script>

<template>
  <UArticle>
    <UContainer>
      <UBox>
        <UCommandPalette :groups="groups">
          <template #empty-state>
            <div class="flex flex-col items-center justify-center gap-3 py-6">
              <span class="text-sm italic">Nothing here!</span>
              <UButton label="Add item" />
            </div>
          </template>
        </UCommandPalette>
      </UBox>
    </UContainer>
  </UArticle>
</template>
