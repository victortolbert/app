<template>
  <div class="p-12 prose">
    <p>Hi, my name is {{ user }}</p>

    <label class="block" for="username">
      <span class="text-gray-700">Username</span>
      <input
        class="block w-full mt-1 form-input"
        v-model="user"
        id="username"
        name="username"
      />
    </label>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: 'Alice',
  }),
}
</script>
