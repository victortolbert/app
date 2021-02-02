<template>
  <main class="flex-1 p-8 prose dark:prose-dark">
    <NuxtLink to="/">Home</NuxtLink>

    <h2>Shop</h2>

    <ul>
      <li v-for="product in products" :key="product.slug">
        {{ product.title }} -
        {{ product.categories.map(category => category.slug).join(', ') }}
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  async asyncData({$content, route}) {
    const products = await $content('products')
      .where({'categories.slug': {$contains: ['top', 'man']}})
      .fetch()

    return {
      products,
    }
  },
  watchQuery: true,
}
</script>
