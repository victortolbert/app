<script setup lang="ts">
const name = ref('')

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <div>
    <!-- class="mt-5 w-[250px] border border-gray-200 rounded bg-transparent px-4 py-2 text-center outline-none dark:border-gray-700 active:outline-none" -->
    <div class="mt-5 w-[250px] border border-gray-200 rounded bg-transparent px-4 py-2 text-center outline-none dark:border-gray-700 active:outline-none">
      <UInput
        id="input"
        v-model="name"
        placeholder="What's your name?"
        autocomplete="off"
        @keydown.enter="go"
      />
    </div>

    <div class="m-3">
      <!-- class="m-3 text-sm btn" -->
      <UButton :disabled="!name" @click="go">
        GO
      </UButton>
    </div>
  </div>
</template>
