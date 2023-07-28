<script setup lang="ts">
const route = useRoute<'hi-id'>()
const user = useUserStore()
const name = route.params.id

watchEffect(() => {
  user.setNewName(route.params.id as string)
})

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <UArticle>
    <UContainer>
      <UIcon name="i-twemoji-waving-hand" />
      <UIcon name="i-heroicons-light-bulb" />

      <h3 class="text-2xl font-medium">
        Hi,
      </h3>
      <div class="text-xl">
        {{ name }}!
      </div>

      <template v-if="user.otherNames.length">
        <p class="my-4 text-sm">
          <span class="opacity-50">Also as known as:</span>
          <ul>
            <li v-for="otherName in user.otherNames" :key="otherName">
              <router-link :to="`/hi/${otherName}`" replace>
                {{ otherName }}
              </router-link>
            </li>
          </ul>
        </p>
      </template>

      <Counter />

      <div>
        <NuxtLink
          class="m-3 text-sm btn"
          to="/"
        >
          Back
        </NuxtLink>
      </div>
    </UContainer>
  </UArticle>
</template>
