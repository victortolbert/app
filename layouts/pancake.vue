<template>
  <div class="page-wrapper">
    <header class="header">
      <h1>Header.com</h1>
    </header>
    <main class="main">
      <Nuxt keep-alive :key="$route.params.id" />
    </main>
    <footer class="footer">Footer Content — Header.com 2020</footer>
  </div>
</template>

<style>
.page-wrapper {
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr auto;
}

.header {
  background: lightpink;
  padding: 2rem;
}

.main {
  background: coral;
}

.footer {
  background: wheat;
  padding: 2rem;
  text-align: center;
}
</style>
